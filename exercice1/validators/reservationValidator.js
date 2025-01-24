const { body, param } = require('express-validator');
const { validatorHandlerMiddleware } = require('./index'); // Assurez-vous que ce middleware est bien défini

// Validator pour la création d'une réservation
const reservationValidatorCreate = [
  body('barcode')
    .notEmpty()
    .withMessage('Le code-barre est obligatoire.')
    .isAlphanumeric()
    .withMessage('Le code-barre doit être alphanumérique.')
    .bail(),

  body('quantity')
    .notEmpty()
    .withMessage('La quantité est obligatoire.')
    .isInt({ gt: 0 })
    .withMessage('La quantité doit être un nombre entier positif.'),
    
  body('clientId')
    .notEmpty()
    .withMessage('L\'ID du client est obligatoire.')
,
  body('storeId')
    .notEmpty()
    .withMessage('L\'ID du magasin est obligatoire.')
,
  validatorHandlerMiddleware // Middleware pour gérer les erreurs
];

// Validator pour récupérer les réservations par client
const reservationValidatorGetByClient = [
  param('clientId')
    .notEmpty()
    .withMessage('L\'ID du client est obligatoire.')
,
  validatorHandlerMiddleware // Middleware pour gérer les erreurs
];

// Validator pour la mise à jour d'une réservation
const reservationValidatorUpdate = [
  param('reservationId')
    .notEmpty()
    .withMessage('L\'ID de la réservation est obligatoire.')
  ,

  body('status')
    .notEmpty()
    .withMessage('Le statut de la réservation est obligatoire.')
    .isString()
    .withMessage('Le statut doit être une chaîne de caractères.'),

  validatorHandlerMiddleware // Middleware pour gérer les erreurs
];

// Validator pour supprimer une réservation
const reservationValidatorDelete = [
  param('reservationId')
    .notEmpty()
    .withMessage('L\'ID de la réservation est obligatoire.')
    ,

  validatorHandlerMiddleware // Middleware pour gérer les erreurs
];

module.exports = {
  reservationValidatorCreate,
  reservationValidatorGetByClient,
  reservationValidatorUpdate,
  reservationValidatorDelete
};
