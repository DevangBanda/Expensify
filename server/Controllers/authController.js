import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWTKey, { expiresIn: "30d" });
}

export async function signup(req, res) {
  const { name, email, password, img } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, and password are required" });
  }

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) return res.status(409).json({ message: "Email already in use" });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hash,
    img: img || null,
  });

  const token = signToken(user._id);
  return res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email, img: user.img } });
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid email or password" });

  const token = signToken(user._id);
  return res.status(200).json({ token, user: { _id: user._id, name: user.name, email: user.email, img: user.img } });
}

export async function me(req, res) {
  const user = await User.findById(req.userId).select("_id name email img createdAt");
  return res.status(200).json({ user });
}
