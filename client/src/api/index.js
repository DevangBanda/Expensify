import axios from "axios";

// Vite env: set VITE_API_URL=http://localhost:5100/api
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5100/api";

const API = axios.create({ baseURL });

// Attach token from persisted redux state (localStorage)
API.interceptors.request.use((config) => {
  try {
    const persisted = localStorage.getItem("persist:root");
    if (persisted) {
      const root = JSON.parse(persisted);
      const auth = root.auth ? JSON.parse(root.auth) : null;
      const token = auth?.token;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore
  }
  return config;
});

// ---------- Auth ----------
export const userSignUp = (data) => API.post("/auth/signup", data);
export const userSignIn = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

// ---------- Categories ----------
export const addCategory = (data) => API.post("/categories", data);
export const getCategoryList = () => API.get("/categories");
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

// ---------- Expenses ----------
export const addExpense = (data) => API.post("/expenses", data);
export const getExpenses = (params) => API.get("/expenses", { params });
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);

// ---------- CSV Import ----------
export const importExpensesCSV = (rows) => API.post("/expenses/import/csv", { rows });
