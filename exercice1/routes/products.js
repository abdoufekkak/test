const express = require('express');
const router = express.Router();
const productController = require('../controlleur/productController');
const productValidator = require('../validators/productValidator');

// Créer un produit
router.post('/',productValidator.productValidatorAdd, productController.createProduct);
router.get('/', productController.getAllProduct);

// Lire un produit
router.get('/:barcode', productController.getProduct);

// Mettre à jour un produit
router.put('/:barcode', productValidator.productValidatorPut,productController.updateProduct);

// Supprimer un produit
router.delete('/:barcode',productValidator.productValidatorDelete ,productController.deleteProduct);

module.exports = router;
