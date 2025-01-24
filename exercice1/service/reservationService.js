const db = require('../config/db');
const BaseError = require('../utils/types-errors/base-error');
const NotFoundError = require('../utils/types-errors/not-found');

// Créer une réservation pour un produit dans un magasin
const createReservation = async (storeId, barcode, quantity, clientId) => {
  try {
    const storeRef = db.collection('stores').doc(storeId);
    const storeDoc = await storeRef.get();

    // Vérifier si le magasin existe
    if (!storeDoc.exists) {
      throw new NotFoundError('Magasin non trouvé');
    }

    const productRef = db.collection('products').doc(barcode);
    const productDoc = await productRef.get();

    // Vérifier si le produit existe dans la collection "products"
    if (!productDoc.exists) {
      throw new NotFoundError('Produit non trouvé.');
    }

    const storeData = storeDoc.data();
    const products = storeData.products || []; // Tableau de produits

    // Rechercher le produit dans le tableau des produits du magasin
    const productIndex = products.findIndex((product) => product.barcode === barcode);

    if (productIndex === -1 || products[productIndex].quantity < quantity) {
      throw new BaseError('Stock insuffisant pour ce produit');
    }

    // Déduire la quantité réservée du stock
    products[productIndex].quantity -= quantity;

    // Mettre à jour les produits dans le magasin
    await storeRef.update({ products });

    // Enregistrer la réservation dans une nouvelle collection "reservations"
    const reservationRef = db.collection('reservations').doc();
    await reservationRef.set({
      id: reservationRef.id,
      storeId,
      barcode,
      quantity,
      clientId,
      timestamp: new Date().toISOString(),
    });

    return { success: true, message: 'Réservation créée avec succès.' };
  } catch (error) {
    console.error('Erreur lors de la création de la réservation :', error);
    throw new Error(`Erreur lors de la réservation : ${error.message}`);
  }
};

// Lire les réservations pour un client

const getReservationsByClient = async (clientId) => {
    try {
      const reservationSnapshot = await db.collection('reservations')
        .where('clientId', '==', clientId)
        .get();
  
      if (reservationSnapshot.empty) {
        throw new NotFoundError('Aucune réservation trouvée pour ce client.');
      }
  
      // Inclure l'ID de chaque document dans les résultats
      const reservations = reservationSnapshot.docs.map(doc => ({
        id: doc.id,        // Récupérer l'ID du document
        ...doc.data(),     // Inclure les données du document
      }));
  
      return { data: reservations };
    } catch (error) {
      throw new Error(error.message);
    }
  };

// Mettre à jour une réservation (modifier son statut, par exemple)
const updateReservation = async (reservationId, status) => {
  try {
    const reservationRef = db.collection('reservations').doc(reservationId);
    const reservationDoc = await reservationRef.get();

    if (!reservationDoc.exists) {
      throw new NotFoundError('Réservation non trouvée.');
    }

    await reservationRef.update({ status });

    return { message: 'Réservation mise à jour avec succès.' };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Supprimer une réservation
const deleteReservation = async (reservationId) => {
  try {
    const reservationRef = db.collection('reservations').doc(reservationId);
    const reservationDoc = await reservationRef.get();

    if (!reservationDoc.exists) {
      throw new NotFoundError('Réservation non trouvée.');
    }

    // Récupérer les détails de la réservation avant suppression pour restaurer le stock
    const reservationData = reservationDoc.data();
    const storeRef = db.collection('stores').doc(reservationData.storeId);
    const storeDoc = await storeRef.get();
    const storeData = storeDoc.data();
    const products = storeData.products || {};

    if (products[reservationData.barcode]) {
      products[reservationData.barcode].quantity += reservationData.quantity;
      await storeRef.update({ products });
    }

    // Supprimer la réservation
    await reservationRef.delete();

    return { message: 'Réservation supprimée avec succès.' };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createReservation, getReservationsByClient, updateReservation, deleteReservation };
