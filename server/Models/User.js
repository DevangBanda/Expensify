//User.js File : Devang Bands
import mongoose from "mongoose";
const password2 = "12sdfgsdgdfg3456";
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
