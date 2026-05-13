import twilioClient from "../config/twilio.js";

/**
 * Formats a WhatsApp confirmation message for an order.
 * @param {Object} order - Mongoose Order document
 * @returns {string} Formatted message string
 */
const formatOrderMessage = (order) => {
  const itemsList = order.items
    .map((item) => `  • ${item.name} x${item.quantity} — ₹${item.price * item.quantity}`)
    .join("\n");

  return `🍽️ *Order Confirmed!*

Hello *${order.customerName}*! Your order has been placed successfully.

📋 *Order ID:* ${order.orderId}

🛒 *Items Ordered:*
${itemsList}

💰 *Total Amount:* ₹${order.totalAmount}
🕐 *Estimated Delivery:* ${order.estimatedDelivery}

📍 *Delivery Address:*
${order.address.street}, ${order.address.city}
${order.address.state} - ${order.address.pincode}

Thank you for ordering with us! We'll keep you updated. 🙏`;
};

/**
 * Sends a WhatsApp order confirmation to the customer.
 * @param {Object} order - Mongoose Order document
 */
export const sendOrderConfirmation = async (order) => {
  const to = `whatsapp:+91${order.phone.replace(/\D/g, "").slice(-10)}`;
  const from = process.env.TWILIO_WHATSAPP_NUMBER;

  const message = await twilioClient.messages.create({
    body: formatOrderMessage(order),
    from,
    to,
  });

  // Mark as notified in DB (fire and forget update)
  order.whatsappNotified = true;
  await order.save();

  console.log(`✅ WhatsApp sent to ${to} — SID: ${message.sid}`);
  return message;
};

/**
 * Sends a WhatsApp status update when order status changes.
 * @param {Object} order - Mongoose Order document
 * @param {string} newStatus - New order status
 */
export const sendStatusUpdate = async (order, newStatus) => {
  const statusMessages = {
    preparing: `👨‍🍳 Your order *${order.orderId}* is being prepared!`,
    out_for_delivery: `🛵 Your order *${order.orderId}* is out for delivery!`,
    delivered: `✅ Your order *${order.orderId}* has been delivered. Enjoy your meal! 😋`,
    cancelled: `❌ Your order *${order.orderId}* has been cancelled. Please contact support.`,
  };

  const body = statusMessages[newStatus];
  if (!body) return;

  const to = `whatsapp:+91${order.phone.replace(/\D/g, "").slice(-10)}`;
  const from = process.env.TWILIO_WHATSAPP_NUMBER;

  const message = await twilioClient.messages.create({ body, from, to });
  console.log(`✅ Status update sent to ${to} — SID: ${message.sid}`);
  return message;
};
