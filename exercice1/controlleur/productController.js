const productService = require('../service/productService');
const NotFoundError = require('../utils/types-errors/not-found');

// Créer un produit
const createProduct = async (req, res,next) => {
  const { barcode, name, description, expirationDate } = req.body;
  try {
    await productService.createProduct(barcode, name, description, expirationDate);
    res.status(201).json({ message: 'Produit créé avec succès.' });
  } catch (error) {
    next(error)  }
};

// Lire un produit
const getProduct = async (req, res,next) => {
  const { barcode } = req.params;
  try {
    const product = await productService.getProduct(barcode);
    if (!product) {
        throw new NotFoundError('Produit non trouvé');

    }
    res.status(200).json(product);
  } catch (error) {
    next(error)  }
};
// Lire un produit
const getAllProduct = async (req, res,next) => {
    try {
      const products = await productService.getAllProduct();
     
      res.status(200).json(products);
    } catch (error) {
      next(error)  }
  };
// Mettre à jour un produit
const updateProduct = async (req, res,next) => {
  const { barcode } = req.params;
  const updates = req.body;
  
  try {
    const product = await productService.getProduct(barcode);
    if (!product) {
        throw new NotFoundError('Produit non trouvé');

    }
    await productService.updateProduct(barcode, updates);
    res.status(200).json({ message: 'Produit mis à jour avec succès.' });
  } catch (error) {
    next(error);
}
};

// Supprimer un produit
const deleteProduct = async (req, res,next) => {
  const { barcode } = req.params;
  try {
    const product = await productService.getProduct(barcode);
    if (!product) {
        throw new NotFoundError('Produit non trouvé');

    }
    await productService.deleteProduct(barcode);
    res.status(200).json({ message: 'Produit supprimé avec succès.' });
  } catch (error) {
    next(error);
  }
};


module.exports = {
    getAllProduct,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
