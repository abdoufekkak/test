const reservationService = require('../service/reservationService');
const BaseError = require('../utils/types-errors/base-error');

// Créer une réservation pour un produit dans un magasin
const createReservation = async (req, res,next) => {
  const { barcode, quantity, clientId ,storeId} = req.body;



  try {
    if (!barcode || !quantity || !clientId || quantity <= 0) {
        throw new BaseError ('Le barcode, la quantité et l\'ID client sont requis et la quantité doit être positive.' );
     }
    const result = await reservationService.createReservation(storeId, barcode, quantity, clientId);
    res.status(200).json({ message: result.message });
  } catch (error) {
    next(error)
  }
};


const getByClientReservation=  async (req, res,next) => {
    try {
      const { clientId } = req.params;
      const result = await reservationService.getReservationsByClient(clientId);
      res.status(200).json(result);
    } catch (error) {
        next(error)
    }
  };

const updateReservation=async (req, res,next) => {
    try {
      const { reservationId } = req.params;
      const { status } = req.body;
      const result = await reservationService.updateReservation(reservationId, status);
      res.status(200).json(result);
    } catch (error) {
        next(error)    }
  };

  // Supprimer une réservation
const removeReservation = async (req, res) => {
    try {
      const { reservationId } = req.params;
      const result = await reservationService.deleteReservation(reservationId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
module.exports = { createReservation,getByClientReservation,updateReservation ,removeReservation};
