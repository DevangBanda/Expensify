import express from "express";
import { createExpense, deleteExpense, importCsv, listExpenses, updateExpense } from "../Controllers/expenseController.js";
import { requireAuth } from "../Middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, listExpenses);
router.post("/", requireAuth, createExpense);
router.put("/:id", requireAuth, updateExpense);
router.delete("/:id", requireAuth, deleteExpense);

router.post("/import/csv", requireAuth, importCsv);

export default router;
