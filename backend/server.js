import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Route imports
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

// Middleware imports
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import { requestLogger } from "./middleware/logger.middleware.js";

const app = express();

// ─── Connect to Database ──────────────────────────────────────────────────────
connectDB();

// ─── CORS Origins ─────────────────────────────────────────────────────────────
// Always includes localhost for dev. In production, reads FRONTEND_URL from env.
// FRONTEND_URL can be comma-separated for multiple origins:
//   e.g. "https://sprightly-panda-a376bb.netlify.app,https://other-preview.netlify.app"
const DEV_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];

const getAllowedOrigins = () => {
  const raw = process.env.FRONTEND_URL || "";
  const prodOrigins = raw
    .split(",")
    .map((u) => u.trim().replace(/\/$/, "")) // strip trailing slashes
    .filter(Boolean);

  return [...new Set([...DEV_ORIGINS, ...prodOrigins])];
};

const corsOptions = {
  origin: (origin, callback) => {
    const allowed = getAllowedOrigins();
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked origin: ${origin}`);
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ─── Core Middleware ──────────────────────────────────────────────────────────
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Explicitly handle preflight for all routes

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(requestLogger);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Food Ordering API is running",
    environment: process.env.NODE_ENV,
    allowedOrigins: getAllowedOrigins(),
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📡 Allowed origins: ${getAllowedOrigins().join(", ")}`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/api/health\n`);
});

// ─── Unhandled Rejection / Exception Guards ───────────────────────────────────
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});