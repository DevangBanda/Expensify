import express from "express";
import { createCategory, deleteCategory, listCategories } from "../Controllers/categoryController.js";
import { requireAuth } from "../Middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, listCategories);
router.post("/", requireAuth, createCategory);
router.delete("/:id", requireAuth, deleteCategory);

export default router;
