// ─────────────────────────────────────────────────────────────────────────────
// Place this file at: frontend/src/services/api.js
// This is the central API client for all backend communication.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ─── Generic Fetch Wrapper ────────────────────────────────────────────────────
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("adminToken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ─── Product APIs ─────────────────────────────────────────────────────────────
export const productAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ""}`);
  },
  getById: (id) => request(`/products/${id}`),
  getByCategory: (category) => request(`/products/category/${category}`),
  getCategories: () => request("/products/categories"),
  create: (data) => request("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => request(`/products/${id}`, { method: "DELETE" }),
};

// ─── Order APIs ───────────────────────────────────────────────────────────────
export const orderAPI = {
  create: (data) => request("/orders", { method: "POST", body: JSON.stringify(data) }),
  getById: (id) => request(`/orders/${id}`),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/admin/orders${query ? `?${query}` : ""}`);
  },
  updateStatus: (id, data) =>
    request(`/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (id) => request(`/admin/orders/${id}`, { method: "DELETE" }),
};

// ─── Payment APIs ─────────────────────────────────────────────────────────────
export const paymentAPI = {
  createRazorpayOrder: (amount) =>
    request("/payments/create-order", {
      method: "POST",
      body: JSON.stringify({ amount }),
    }),
  verifyPayment: (data) =>
    request("/payments/verify", { method: "POST", body: JSON.stringify(data) }),
  reportFailed: (data) =>
    request("/payments/failed", { method: "POST", body: JSON.stringify(data) }),
};

// ─── Auth APIs ────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (credentials) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  getMe: () => request("/auth/me"),
};

// ─── Admin APIs ───────────────────────────────────────────────────────────────
export const adminAPI = {
  getStats: () => request("/admin/stats"),
};
