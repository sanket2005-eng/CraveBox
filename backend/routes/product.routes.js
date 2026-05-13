import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { productValidation } from "../validations/product.validation.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/categories", getCategories);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);

// Admin protected routes
router.post("/", protect, productValidation, validate, createProduct);
router.put("/:id", protect, productValidation, validate, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
