const storeService = require('../service/storeService');
const BaseError = require('../utils/types-errors/base-error');
const NotFoundError = require('../utils/types-errors/not-found');

// Créer un magasin
const createStore = async (req, res,next) => {
  const { storeId, name, location } = req.body;
  try {
    await storeService.createStore(storeId, name, location);
    res.status(201).json({ message: 'Magasin créé avec succès.' });
  } catch (error) {
    next(error);
  }
};

// Lire un magasin
const getStore = async (req, res,next) => {
  const { storeId } = req.params;
  try {
    const store = await storeService.getStore(storeId);
    if (!store) {
        throw new NotFoundError ('Magasin non trouvé.' );
    }
    res.status(200).json(store);
  } catch (error) {
    next(error);
  }
};
const getAllStores = async (req, res,next) => {
    try {
      const store = await storeService.getAllStores();
     
      res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  };
  

// Mettre à jour un magasin
const updateStore = async (req, res,next) => {
  const { storeId } = req.params;
  const updates = req.body;
  try {
    const store = await storeService.getStore(storeId);
    if (!store) {
        throw new NotFoundError ('Magasin non trouvé' );
    }
    await storeService.updateStore(storeId, updates);
    res.status(200).json({ message: 'Magasin mis à jour avec succès.' });
  } catch (error) {
    next(error);
  }
};

// Supprimer un magasin
const deleteStore = async (req, res,next) => {
  const { storeId } = req.params;
  try {
    const store = await storeService.getStore(storeId);
    if (!store) {
        throw new NotFoundError ('Magasin non trouvé.' );
    }
    await storeService.deleteStore(storeId);
    res.status(200).json({ message: 'Magasin supprimé avec succès.' });
  } catch (error) {
    next(error);
  }
};
const addProductToStore = async (req, res,next) => {
    const { storeId } = req.params;
    const { barcode, quantity } = req.body;
  
  
  
    try {
        if (!barcode || !quantity || quantity <= 0) {
            throw new BaseError ('Le barcode et la quantité sont requis et la quantité doit être positive.');
           }
      const result = await storeService.addProductToStore(storeId, barcode, quantity);
      res.status(200).json({ message: result.message });
    } catch (error) {
        next(error);

    }
    
  };

module.exports = {
    getAllStores,
  createStore,
  getStore,
  updateStore,
  deleteStore,
  addProductToStore
};

