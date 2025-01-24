const { body, param } = require('express-validator');
const { validatorHandlerMiddleware } = require('./index'); // Assurez-vous que ce middleware est bien défini

const productValidatorAdd = [
  // Validation conditionnelle en fonction de la méthode HTTP
  body('barcode')
    .notEmpty()
    .withMessage('Le code-barre est obligatoire.')
    .isAlphanumeric()
    .withMessage('Le code-barre doit être alphanumérique.')
    .bail(),
  
  body('name')
    .notEmpty()
    .withMessage('Le nom du produit est obligatoire.')
    .isLength({ min: 3 })
    .withMessage('Le nom doit contenir au moins 3 caractères.')
    .bail(),
  
  body('description')
    .optional()
    .isString()
    .withMessage('La description doit être une chaîne de caractères.')
    .bail(),
  
  body('expirationDate')
    .notEmpty()
    .withMessage('La date d’expiration est obligatoire.')
    .isISO8601()
    .withMessage('La date d’expiration doit être une date valide (format ISO8601).'),

  
  
  validatorHandlerMiddleware, // Middleware pour gérer les erreurs
];

const productValidatorDelete = [
    param('barcode')
      .notEmpty()
      .withMessage('L\'ID du produit est obligatoire.')
,    
    validatorHandlerMiddleware // Middleware pour gérer les erreurs
  ];
  const productValidatorPut = [
    // Validation pour la mise à jour (PUT) où certains champs sont optionnels
  
    body('name')
      .optional()
      .isLength({ min: 3 })
      .withMessage('Le nom doit contenir au moins 3 caractères.')
      .bail(),
  
    body('description')
      .optional()
      .isString()
      .withMessage('La description doit être une chaîne de caractères.')
      .bail(),
  
    body('expirationDate')
      .optional()
      .isISO8601()
      .withMessage('La date d’expiration doit être une date valide (format ISO8601).'),
  
    validatorHandlerMiddleware, // Middleware pour gérer les erreurs de validation
  ];
module.exports = {productValidatorAdd,productValidatorPut,productValidatorDelete};
