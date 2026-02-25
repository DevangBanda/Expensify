import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./Routes/authRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import expenseRoutes from "./Routes/expenseRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => res.status(200).send("ok"));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);

// Simple error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  return res.status(status).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5100;

mongoose
  .connect(process.env.mongoDB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
