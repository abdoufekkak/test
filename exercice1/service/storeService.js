const db = require('../config/db');

// Créer un magasin
const createStore = async (storeId, name, location) => {
  await db.collection('stores').doc(storeId).set({
    storeId,
    name,
    location,
    products: [], // Initialiser le stock vide
  });
};

const addProductToStore = async (storeId, barcode, quantity) => {
  try {
    const storeRef = db.collection('stores').doc(storeId);
    const storeDoc = await storeRef.get();

    if (!storeDoc.exists) {
      throw new Error('Magasin non trouvé.');
    }

    // Vérifier si le produit existe dans la collection "products"
    const productRef = db.collection('products').doc(barcode);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      throw new Error('Produit non trouvé.');
    }

    const storeData = storeDoc.data();
    const products = storeData.products || []; // Initialiser à un tableau vide si null ou undefined

    // Vérifier si le produit existe déjà dans le tableau
    const existingProductIndex = products.findIndex((product) => product.barcode === barcode);

    if (existingProductIndex !== -1) {
      // Si le produit existe, mettre à jour la quantité
      products[existingProductIndex].quantity += quantity;
    } else {
      // Sinon, ajouter un nouvel objet produit
      products.push({ barcode, quantity });
    }

    // Mettre à jour les produits dans le magasin
    await storeRef.update({ products });

    return { success: true, message: 'Produit ajouté au stock avec succès.' };
  } catch (error) {
    throw new Error(`Erreur lors de l'ajout du produit : ${error.message}`);
  }
};

// Lire un magasin
const getStore = async (storeId) => {
  const storeRef = db.collection('stores').doc(storeId);
  const storeDoc = await storeRef.get();
  return storeDoc.exists ? storeDoc.data() : null;
};
const getAllStores = async () => {
    const storesSnapshot = await db.collection('stores').get();

    // Transformer les documents en un tableau d'objets
    const stores = storesSnapshot.docs.map(doc => ({
      id: doc.id, // Inclure l'ID du document
      ...doc.data(), // Inclure les données du document
    }));

    // Vérifier s'il existe des documents dans la collection
    return stores.length > 0 ? stores : null;
  };


// Mettre à jour un magasin
const updateStore = async (storeId, updates) => {
  const storeRef = db.collection('stores').doc(storeId);
  await storeRef.update(updates);
};

// Supprimer un magasin
const deleteStore = async (storeId) => {
  const storeRef = db.collection('stores').doc(storeId);
  await storeRef.delete();
};

module.exports = {
    getAllStores,
  createStore,
  getStore,
  updateStore,
  deleteStore,
  addProductToStore
};
