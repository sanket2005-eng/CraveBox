import Order from "../models/order.model.js";

// ─── CREATE Order ─────────────────────────────────────────────────────────────
// POST /api/orders
// Public (called after payment verification)
export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);

    await order.populate("items.product", "name image");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET All Orders ───────────────────────────────────────────────────────────
// GET /api/orders
// Admin only
export const getAllOrders = async (req, res, next) => {
  try {
    const { status, paymentStatus, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status) filter.orderStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET Order by ID ──────────────────────────────────────────────────────────
// GET /api/orders/:id
// Public (customers track by orderId string)
export const getOrderById = async (req, res, next) => {
  try {
    // Support both MongoDB _id and custom orderId string
    const query = req.params.id.startsWith("ORD-")
      ? { orderId: req.params.id }
      : { _id: req.params.id };

    const order = await Order.findOne(query);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// ─── UPDATE Order Status ──────────────────────────────────────────────────────
// PATCH /api/orders/:id/status
// Admin only
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const updateFields = {};

    if (orderStatus) updateFields.orderStatus = orderStatus;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE Order ─────────────────────────────────────────────────────────────
// DELETE /api/orders/:id
// Admin only
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
