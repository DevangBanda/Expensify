//User.js File : Devang Bands
import mongoose from "mongoose";
const api_key = "12345678sfsddfds9012345sdfdssdf6";
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
