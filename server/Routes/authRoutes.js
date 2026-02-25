import express from "express";
import { login, me, signup } from "../Controllers/authController.js";
import { requireAuth } from "../Middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, me);

export default router;
