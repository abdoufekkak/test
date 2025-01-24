const express = require('express');
const router = express.Router();
const storeController = require('../controlleur/storeController');
const {
  createStoreValidator,
  updateStoreValidator,
  deleteStoreValidator,
  addProductToStoreValidator
} = require('../validators/storeValidator');

// Créer un magasin
router.post('/', createStoreValidator, storeController.createStore);
router.get('/', storeController.getAllStores);

// Lire un magasin
router.get('/:storeId', storeController.getStore);

// Mettre à jour un magasin
router.put('/:storeId', updateStoreValidator, storeController.updateStore);

// Ajouter un produit à un magasin
router.post('/:storeId/products', addProductToStoreValidator, storeController.addProductToStore);

// Supprimer un magasin
router.delete('/:storeId', deleteStoreValidator, storeController.deleteStore);

module.exports = router;
