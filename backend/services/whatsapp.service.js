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
 * Formats a WhatsApp admin alert message for a new order.
 * @param {Object} order - Mongoose Order document
 * @returns {string} Formatted message string
 */
const formatAdminAlertMessage = (order) => {
  const itemsList = order.items
    .map((item) => `  • ${item.name} x${item.quantity} — ₹${item.price * item.quantity}`)
    .join("\n");

  return `🔔 *NEW ORDER ALERT!*

📋 *Order ID:* ${order.orderId}
💳 *Payment Status:* ${order.paymentStatus.toUpperCase()}

👤 *Customer Details:*
   Name: ${order.customerName}
   Phone: ${order.phone}

📍 *Delivery Address:*
${order.address.street}, ${order.address.city}
${order.address.state} - ${order.address.pincode}

🛒 *Items Ordered:*
${itemsList}

💰 *Total Amount:* ₹${order.totalAmount}
🕐 *Estimated Delivery:* ${order.estimatedDelivery}

👉 Check dashboard for more details.`;
};

/**
 * Sends a WhatsApp order confirmation to the customer.
 * @param {Object} order - Mongoose Order document
 * @returns {Promise<Object>} Twilio message object
 */
export const sendOrderConfirmation = async (order) => {
  try {
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

    console.log(`✅ Customer confirmation WhatsApp sent to ${to} — SID: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(
      `❌ Failed to send customer WhatsApp for order ${order.orderId}:`,
      error.message
    );
    throw error;
  }
};

/**
 * Sends a WhatsApp new order alert to the admin.
 * @param {Object} order - Mongoose Order document
 * @returns {Promise<Object>} Twilio message object
 */
export const sendAdminOrderAlert = async (order) => {
  try {
    const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;

    if (!adminNumber) {
      console.warn("⚠️  ADMIN_WHATSAPP_NUMBER not configured. Admin alert not sent.");
      return null;
    }

    const to = `whatsapp:${adminNumber}`;
    const from = process.env.TWILIO_WHATSAPP_NUMBER;

    const message = await twilioClient.messages.create({
      body: formatAdminAlertMessage(order),
      from,
      to,
    });

    console.log(
      `✅ Admin order alert WhatsApp sent to ${to} — SID: ${message.sid}`
    );
    return message;
  } catch (error) {
    console.error(
      `❌ Failed to send admin WhatsApp for order ${order.orderId}:`,
      error.message
    );
    throw error;
  }
};

/**
 * Sends a WhatsApp status update when order status changes.
 * @param {Object} order - Mongoose Order document
 * @param {string} newStatus - New order status
 * @returns {Promise<Object|null>} Twilio message object or null if status not supported
 */
export const sendStatusUpdate = async (order, newStatus) => {
  try {
    const statusMessages = {
      preparing: `👨‍🍳 Your order *${order.orderId}* is being prepared!`,
      out_for_delivery: `🛵 Your order *${order.orderId}* is out for delivery!`,
      delivered: `✅ Your order *${order.orderId}* has been delivered. Enjoy your meal! 😋`,
      cancelled: `❌ Your order *${order.orderId}* has been cancelled. Please contact support.`,
    };

    const body = statusMessages[newStatus];
    if (!body) {
      console.warn(`⚠️  No status message template for status: ${newStatus}`);
      return null;
    }

    const to = `whatsapp:+91${order.phone.replace(/\D/g, "").slice(-10)}`;
    const from = process.env.TWILIO_WHATSAPP_NUMBER;

    const message = await twilioClient.messages.create({ body, from, to });
    console.log(`✅ Status update sent to ${to} — SID: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(
      `❌ Failed to send status update WhatsApp for order ${order.orderId}:`,
      error.message
    );
    throw error;
  }
};
