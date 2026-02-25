import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    categoryName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Unique per user
CategorySchema.index({ user: 1, categoryName: 1 }, { unique: true });

export default mongoose.model("Category", CategorySchema);
