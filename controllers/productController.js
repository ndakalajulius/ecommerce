const Product = require('../models/Product');

// Fetch all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Admin: Create new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description, category, imageUrl } = req.body;
    const product = new Product({
      name,
      price,
      description,
      category,
      imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Admin: Update a product
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const { name, price, description, category, imageUrl } = req.body;

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.imageUrl = imageUrl || product.imageUrl;

    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Admin: Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};
