import Category from "../Models/Category.js";

export async function listCategories(req, res) {
  const categories = await Category.find({ user: req.userId }).sort({ categoryName: 1 });
  return res.status(200).json(categories);
}

export async function createCategory(req, res) {
  const { categoryName } = req.body || {};
  const name = (categoryName || "").trim();
  if (!name) return res.status(400).json({ message: "categoryName is required" });

  try {
    const category = await Category.create({ user: req.userId, categoryName: name });
    return res.status(201).json(category);
  } catch (e) {
    if (e?.code === 11000) {
      return res.status(409).json({ message: "Category already exists" });
    }
    throw e;
  }
}

export async function deleteCategory(req, res) {
  const { id } = req.params;
  const deleted = await Category.deleteOne({ _id: id, user: req.userId });
  if (!deleted.deletedCount) return res.status(404).json({ message: "Category not found" });
  return res.status(200).json({ message: "Deleted" });
}
