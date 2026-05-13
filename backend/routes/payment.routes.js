import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
  paymentFailed,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", createRazorpayOrder);
router.post("/verify", verifyPayment);
router.post("/failed", paymentFailed);

export default router;
