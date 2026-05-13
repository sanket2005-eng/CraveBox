import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/order.model.js";
import { sendOrderConfirmation } from "../services/whatsapp.service.js";

// ─── Create Razorpay Order ────────────────────────────────────────────────────
// POST /api/payments/create-order
// Public
export const createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      data: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── Verify Payment & Create Order ───────────────────────────────────────────
// POST /api/payments/verify
// Public
export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData, // Full order details from frontend
    } = req.body;

    // ── Signature Verification ──────────────────────────────────────────────
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed. Invalid signature.",
      });
    }

    // ── Create Order in DB ──────────────────────────────────────────────────
    const order = await Order.create({
      ...orderData,
      paymentStatus: "paid",
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      orderStatus: "confirmed",
    });

    // ── Send WhatsApp Confirmation ──────────────────────────────────────────
    try {
      await sendOrderConfirmation(order);
    } catch (whatsappError) {
      // Non-blocking — log but don't fail the response
      console.error("WhatsApp notification failed:", whatsappError.message);
    }

    res.status(201).json({
      success: true,
      message: "Payment verified and order placed successfully",
      data: {
        orderId: order.orderId,
        totalAmount: order.totalAmount,
        paymentId: razorpay_payment_id,
        orderStatus: order.orderStatus,
        estimatedDelivery: order.estimatedDelivery,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── Payment Failed Handler ───────────────────────────────────────────────────
// POST /api/payments/failed
// Public
export const paymentFailed = async (req, res, next) => {
  try {
    const { razorpay_order_id, error } = req.body;

    // Optionally log the failed attempt
    console.warn(`Payment failed for Razorpay order: ${razorpay_order_id}`, error);

    res.status(200).json({
      success: false,
      message: "Payment failed. Please try again.",
    });
  } catch (err) {
    next(err);
  }
};
