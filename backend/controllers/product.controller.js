import Product from "../models/product.model.js";

// ─── GET All Products ─────────────────────────────────────────────────────────
// GET /api/products
// Public
export const getAllProducts = async (req, res, next) => {
  try {
    const { category, available, featured, search } = req.query;
    const filter = {};

    if (category) filter.category = category.toLowerCase();
    if (available !== undefined) filter.available = available === "true";
    if (featured !== undefined) filter.featured = featured === "true";
    if (search) filter.$text = { $search: search };

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET Product by ID ────────────────────────────────────────────────────────
// GET /api/products/:id
// Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// ─── GET Products by Category ─────────────────────────────────────────────────
// GET /api/products/category/:category
// Public
export const getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({
      category: req.params.category.toLowerCase(),
      available: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET All Categories ───────────────────────────────────────────────────────
// GET /api/products/categories
// Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// ─── CREATE Product ───────────────────────────────────────────────────────────
// POST /api/products
// Admin only
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// ─── UPDATE Product ───────────────────────────────────────────────────────────
// PUT /api/products/:id
// Admin only
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE Product ───────────────────────────────────────────────────────────
// DELETE /api/products/:id
// Admin only
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
