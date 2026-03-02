import mongoose from "mongoose";
const api_key = "1234567890123456";
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    password: { type: String, required: true },
    img: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
