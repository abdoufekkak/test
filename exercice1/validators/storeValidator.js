const { body, param } = require('express-validator');
const { validatorHandlerMiddleware } = require('.');

// Validator pour la création d'un magasin
const createStoreValidator = [
  body('storeId')
    .notEmpty()
    .withMessage('L\'ID du magasin est obligatoire.')
    .isAlphanumeric()
    .withMessage('L\'ID du magasin doit être alphanumérique.'),
  body('name')
    .notEmpty()
    .withMessage('Le nom du magasin est obligatoire.')
    .isLength({ min: 3 })
    .withMessage('Le nom doit contenir au moins 3 caractères.'),
  body('location')
    .notEmpty()
    .withMessage('L\'emplacement du magasin est obligatoire.')
    .isString()
    .withMessage('L\'emplacement doit être une chaîne de caractères.')
    ,validatorHandlerMiddleware
];

// Validator pour la mise à jour d'un magasin
const updateStoreValidator = [
  param('storeId')
    .notEmpty()
    .withMessage('L\'ID du magasin est obligatoire.')
    .isAlphanumeric()
    .withMessage('L\'ID du magasin doit être alphanumérique.'),
  body('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Le nom doit contenir au moins 3 caractères.'),
  body('location')
    .optional()
    .isString()
    .withMessage('L\'emplacement doit être une chaîne de caractères.'),
    validatorHandlerMiddleware
];

// Validator pour la suppression d'un magasin
const deleteStoreValidator = [
  param('storeId')
    .notEmpty()
    .withMessage('L\'ID du magasin est obligatoire.')
    .isAlphanumeric()
    .withMessage('L\'ID du magasin doit être alphanumérique.')
    ,validatorHandlerMiddleware
];

// Validator pour ajouter un produit au magasin
const addProductToStoreValidator = [
  param('storeId')
    .notEmpty()
    .withMessage('L\'ID du magasin est obligatoire.')
    .isAlphanumeric()
    .withMessage('L\'ID du magasin doit être alphanumérique.'),
  body('barcode')
    .notEmpty()
    .withMessage('Le code-barre du produit est obligatoire.')
    .isAlphanumeric()
    .withMessage('Le code-barre doit être alphanumérique.'),
  body('quantity')
    .notEmpty()
    .withMessage('La quantité est obligatoire.')
    .isInt({ min: 1 })
    .withMessage('La quantité doit être un entier positif.'),
    validatorHandlerMiddleware
];

module.exports = {
  createStoreValidator,
  updateStoreValidator,
  deleteStoreValidator,
  addProductToStoreValidator
};
