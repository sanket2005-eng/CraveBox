// ─────────────────────────────────────────────────────────────────────────────
// Place this file at: frontend/src/utils/razorpay.js
// This helper handles the full Razorpay payment flow from the frontend.
// ─────────────────────────────────────────────────────────────────────────────

import { paymentAPI } from "../services/api";

/**
 * Loads the Razorpay script dynamically.
 */
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

/**
 * Initiates the full Razorpay payment flow.
 *
 * @param {Object} options
 * @param {number} options.amount - Total in rupees (e.g. 299)
 * @param {Object} options.customerInfo - { name, phone, email }
 * @param {Object} options.orderData - Full order payload for the backend
 * @param {Function} options.onSuccess - Called with backend response on success
 * @param {Function} options.onFailure - Called with error on failure
 */
export const initiateRazorpayPayment = async ({
  amount,
  customerInfo,
  orderData,
  onSuccess,
  onFailure,
}) => {
  const scriptLoaded = await loadRazorpayScript();

  if (!scriptLoaded) {
    onFailure(new Error("Failed to load Razorpay SDK. Check your internet connection."));
    return;
  }

  try {
    // Step 1: Create Razorpay order on backend
    const { data: razorpayOrder } = await paymentAPI.createRazorpayOrder(amount);

    // Step 2: Open Razorpay checkout
    const razorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
      name: "Food Ordering App",
      description: "Order Payment",
      prefill: {
        name: customerInfo.name,
        contact: customerInfo.phone,
        email: customerInfo.email || "",
      },
      theme: { color: "#f97316" }, // Match your app's brand color
      handler: async (response) => {
        // Step 3: Verify payment on backend & create order
        try {
          const result = await paymentAPI.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderData,
          });
          onSuccess(result);
        } catch (err) {
          onFailure(err);
        }
      },
      modal: {
        ondismiss: () => {
          onFailure(new Error("Payment was cancelled by user."));
        },
      },
    };

    const rzp = new window.Razorpay(razorpayOptions);

    rzp.on("payment.failed", async (response) => {
      await paymentAPI.reportFailed({
        razorpay_order_id: razorpayOrder.id,
        error: response.error,
      });
      onFailure(new Error(response.error.description || "Payment failed"));
    });

    rzp.open();
  } catch (error) {
    onFailure(error);
  }
};
