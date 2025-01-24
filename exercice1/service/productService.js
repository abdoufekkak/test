const db = require('../config/db');
const BaseError = require('../utils/types-errors/base-error');

// Créer un produit
const createProduct = async (barcode, name, description, expirationDate) => {
  await db.collection('products').doc(barcode).set({
    barcode,
    name,
    description,
    expirationDate: new Date(expirationDate),
  });
};


// Vérifier si le produit existe dans un magasin
const isProductInStore = async (barcode) => {
  try {
    const storeSnapshot = await db.collection('stores').get();

    // Parcourir chaque magasin pour vérifier si le produit existe
    for (const doc of storeSnapshot.docs) {
      const storeData = doc.data();
      const products = storeData.products || []; // Tableau de produits ou vide
      
      // Vérifier si le produit existe dans le tableau
      if (products.some((product) => product.barcode === barcode)) {
        return true; // Le produit est trouvé dans un magasin
      }
    }

    return false; // Aucun magasin ne contient ce produit
  } catch (error) {
    console.error('Erreur lors de la vérification du produit :', error);
    return false; // Retourner false en cas d'erreur
  }
};

const isProductReserved = async (barcode) => {
  try {
    const reservationSnapshot = await db
      .collection('reservations')
      .where('barcode', '==', barcode)
      .get(); // Rechercher les réservations avec le code-barres spécifié

    // Afficher les documents trouvés pour débogage
    console.log('Réservations trouvées :', reservationSnapshot.docs);

    // Vérifier si des documents existent
    return reservationSnapshot.docs.length > 0; // Retourne true si le produit est réservé
  } catch (error) {
    console.error('Erreur lors de la vérification de la réservation :', error.message);
    throw new Error(`Erreur lors de la vérification : ${error.message}`);
  }
};
// Lire un produit
const getProduct = async (barcode) => {
  const productRef = db.collection('products').doc(barcode);
  const productDoc = await productRef.get();
  return productDoc.exists ? productDoc.data() : null;
};
const getAllProduct = async () => {
    const productsSnapshot = await db.collection('products').get();
    const products = productsSnapshot.docs.map(doc => ({
        id: doc.id, // Inclure l'ID du document
        ...doc.data(), // Inclure les données du document
      }));
  
      return products.length > 0 ? products : null;  };

// Mettre à jour un produit
const updateProduct = async (barcode, updates) => {
  const productRef = db.collection('products').doc(barcode);
  
  await productRef.update(updates);
};

// Supprimer un produit
const deleteProduct = async (barcode) => {
    const isInStore = await isProductInStore(barcode);
  if (isInStore) {
    throw new BaseError('Le produit est lié à un magasin et ne peut pas être supprimé.');
  }

  // Vérifier si le produit est réservé
  const isReserved = await isProductReserved(barcode);
  if (isReserved) {
    throw new BaseError('Le produit est réservé et ne peut pas être supprimé.');
  }
  const productRef = db.collection('products').doc(barcode);
  await productRef.delete();
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProduct
};
