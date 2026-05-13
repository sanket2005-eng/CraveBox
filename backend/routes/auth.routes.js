import express from "express";
import { adminLogin, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/me", protect, getMe);

export default router;
