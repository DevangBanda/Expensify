import Expense from "../Models/Expense.js";
import Category from "../Models/Category.js";

function parseDateStr(dateStr) {
  // Accept common date formats like "MM/DD/YYYY" or ISO
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;
  return null;
}

export async function listExpenses(req, res) {
  const { start, end, limit = 200 } = req.query;

  const q = { user: req.userId };
  if (start || end) {
    q.date = {};
    if (start) q.date.$gte = new Date(start);
    if (end) q.date.$lte = new Date(end);
  }

  const items = await Expense.find(q)
    .sort({ date: -1 })
    .limit(Math.min(parseInt(limit, 10) || 200, 1000));

  return res.status(200).json(
    items.map((e) => ({
      _id: e._id,
      date: e.date,
      dateStr: e.date.toLocaleDateString(),
      description: e.description,
      amount: e.amount,
      categoryId: e.category,
      categoryName: e.categoryName,
    }))
  );
}

export async function createExpense(req, res) {
  const { dateStr, description, amount, categoryId, categoryName } = req.body || {};

  const desc = (description || "").trim();
  if (!desc) return res.status(400).json({ message: "description is required" });

  const amt = Number(amount);
  if (!Number.isFinite(amt)) return res.status(400).json({ message: "amount must be a number" });

  const date = parseDateStr(dateStr) || new Date();
  let category = null;

  if (categoryId) {
    category = await Category.findOne({ _id: categoryId, user: req.userId });
  }

  if (!category && categoryName) {
    const name = categoryName.trim();
    category = await Category.findOneAndUpdate(
      { user: req.userId, categoryName: name },
      { $setOnInsert: { user: req.userId, categoryName: name } },
      { upsert: true, new: true }
    );
  }

  if (!category) return res.status(400).json({ message: "Valid categoryId or categoryName is required" });

  const exp = await Expense.create({
    user: req.userId,
    date,
    description: desc,
    amount: amt,
    category: category._id,
    categoryName: category.categoryName,
  });

  return res.status(201).json({
    _id: exp._id,
    date: exp.date,
    dateStr: exp.date.toLocaleDateString(),
    description: exp.description,
    amount: exp.amount,
    categoryId: exp.category,
    categoryName: exp.categoryName,
  });
}

export async function updateExpense(req, res) {
  const { id } = req.params;
  const { dateStr, description, amount, categoryId, categoryName } = req.body || {};

  const patch = {};
  if (description !== undefined) patch.description = (description || "").trim();
  if (amount !== undefined) {
    const amt = Number(amount);
    if (!Number.isFinite(amt)) return res.status(400).json({ message: "amount must be a number" });
    patch.amount = amt;
  }
  if (dateStr !== undefined) {
    const d = parseDateStr(dateStr);
    if (!d) return res.status(400).json({ message: "Invalid dateStr" });
    patch.date = d;
  }

  if (categoryId || categoryName) {
    let category = null;
    if (categoryId) category = await Category.findOne({ _id: categoryId, user: req.userId });
    if (!category && categoryName) {
      const name = categoryName.trim();
      category = await Category.findOneAndUpdate(
        { user: req.userId, categoryName: name },
        { $setOnInsert: { user: req.userId, categoryName: name } },
        { upsert: true, new: true }
      );
    }
    if (!category) return res.status(400).json({ message: "Invalid category" });
    patch.category = category._id;
    patch.categoryName = category.categoryName;
  }

  const updated = await Expense.findOneAndUpdate({ _id: id, user: req.userId }, patch, { new: true });
  if (!updated) return res.status(404).json({ message: "Expense not found" });

  return res.status(200).json({
    _id: updated._id,
    date: updated.date,
    dateStr: updated.date.toLocaleDateString(),
    description: updated.description,
    amount: updated.amount,
    categoryId: updated.category,
    categoryName: updated.categoryName,
  });
}

export async function deleteExpense(req, res) {
  const { id } = req.params;
  const deleted = await Expense.deleteOne({ _id: id, user: req.userId });
  if (!deleted.deletedCount) return res.status(404).json({ message: "Expense not found" });
  return res.status(200).json({ message: "Deleted" });
}

export async function importCsv(req, res) {
  const rows = req.body?.rows;
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ message: "rows array is required" });
  }

  let created = 0;
  const errors = [];

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i] || {};
    const date = parseDateStr(r.dateStr) || new Date();
    const desc = (r.description || "").trim();
    const amt = Number(r.amount);
    const catName = (r.categoryName || "Expense").trim();

    if (!desc || !Number.isFinite(amt)) {
      errors.push({ row: i + 1, message: "Invalid description or amount" });
      continue;
    }

    const category = await Category.findOneAndUpdate(
      { user: req.userId, categoryName: catName },
      { $setOnInsert: { user: req.userId, categoryName: catName } },
      { upsert: true, new: true }
    );

    await Expense.create({
      user: req.userId,
      date,
      description: desc,
      amount: amt,
      category: category._id,
      categoryName: category.categoryName,
    });
    created++;
  }

  return res.status(200).json({ created, errors });
}
