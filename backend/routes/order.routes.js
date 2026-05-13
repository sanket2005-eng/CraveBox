import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { orderValidation } from "../validations/order.validation.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

// Public: create order
router.post("/", orderValidation, validate, createOrder);

// Admin protected: list all orders — must come BEFORE /:id to avoid "all" being treated as an id
router.get("/", protect, getAllOrders);

// Admin protected: update/delete specific order
router.patch("/:id/status", protect, updateOrderStatus);
router.delete("/:id", protect, deleteOrder);

// Public: track order by orderId string (e.g. ORD-XXXXXXXX) or MongoDB _id
router.get("/:id", getOrderById);

export default router;
