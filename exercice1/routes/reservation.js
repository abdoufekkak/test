const express = require('express');
const router = express.Router();
const reservationController = require('../controlleur/reservationController');
const {
  reservationValidatorCreate,
  reservationValidatorGetByClient,
  reservationValidatorUpdate,
  reservationValidatorDelete
} = require('../validators/reservationValidator');

// Créer une réservation pour un produit dans un magasin
router.post('/create', reservationValidatorCreate, reservationController.createReservation);

// Récupérer les réservations d'un client
router.get('/client/:clientId', reservationValidatorGetByClient, reservationController.getByClientReservation);

// Mettre à jour une réservation
router.put('/update/:reservationId', reservationValidatorUpdate, reservationController.updateReservation);

// Supprimer une réservation
router.delete('/delete/:reservationId', reservationValidatorDelete, reservationController.removeReservation);

module.exports = router;
