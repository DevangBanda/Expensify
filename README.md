# Expensify (JWT + CSV Import + Charts)

A full‑stack **MERN** expense tracker that lets users **sign up / log in**, manage **categories**, add/edit/delete **expenses**, import expenses from **CSV**, and view spending breakdowns using interactive **charts**.

## Features

- ✅ **Authentication (JWT)** – secure sign up / login
- ✅ **Categories** – create/delete custom categories (unique per user)
- ✅ **Expenses CRUD** – add, update, delete, list (latest first)
- ✅ **CSV Import** – bulk-import expenses (auto-creates missing categories)
- ✅ **Charts** – pie, bar, and line charts of spending
- ✅ **Persisted Login** – Redux Persist keeps you signed in

## Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit + Redux Persist
- Axios (token interceptor)
- styled-components
- MUI X Charts + MUI Date Pickers
- PapaParse (CSV parsing)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT auth
- bcrypt password hashing

---

## Getting Started (Local)

### 1) Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Server runs on `http://localhost:5100`  
Health check: `GET /health`

### 2) Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Client runs on `http://localhost:5173`

---

## CSV Import Format

Your CSV should include these headers:

```csv
dateStr,description,amount,categoryName
01/15/2026,Coffee,4.75,Food
01/16/2026,Bus pass,112,Transport
```

Notes:
- `amount` must be numeric
- If `categoryName` doesn't exist yet, it will be created automatically

---

## API Overview

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET  /api/auth/me`

- `GET  /api/categories`
- `POST /api/categories`
- `DELETE /api/categories/:id`

- `GET  /api/expenses`
- `POST /api/expenses`
- `PUT  /api/expenses/:id`
- `DELETE /api/expenses/:id`
- `POST /api/expenses/import/csv`

---

## Project Structure

```
server/
  Controllers/
  Middleware/
  Models/
  Routes/
client/
  src/
    Components/
    Pages/
    api/
    store/
```

---

## Resume Bullets (example)

- Built a full‑stack **MERN** expense tracker with **JWT authentication**, **MongoDB** persistence, and a responsive **React** UI.
- Implemented **CSV ingestion** pipeline with server-side normalization and automatic category creation.
- Added data visualization using **MUI X Charts** to display spending by category and trends over time.

---

## License

MIT
