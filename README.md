# ShopZone ⚡

A recruiter-friendly E-Commerce SPA built with **React 18**, **React Router v6**, and **Context API**.

## Tech Stack
| Layer | Tool |
|---|---|
| UI | React 18 |
| Routing | React Router DOM v6 |
| State | Context API + useReducer |
| Persistence | localStorage |
| Data | dummyjson.com REST API |
| Styling | Inline CSS + CSS Variables |

## Features
- 🛍 **Shop page** — 100 products with search & category filter
- 🔍 **Product detail** — image gallery, add-to-cart, stock info
- 🛒 **Cart** — qty controls, remove items, live total
- 🔐 **Auth** — mock "Login as Guest", protected Checkout route
- 💾 **Persistence** — cart & auth survive page refresh via localStorage
- 📱 **Responsive** — fluid grid layouts

## Getting Started

```bash
# 1. Clone or unzip
cd shopzone

# 2. Install dependencies
npm install

# 3. Run locally
npm start
# → http://localhost:3000
Deploy to Vercel
Option A — Vercel CLI (fastest):
npm install -g vercel
vercel        # follow the prompts; framework = Create React App
Option B — Vercel Dashboard:
Push the project to a GitHub repo.
Go to vercel.com → Add New Project → import repo.
Framework preset: Create React App (auto-detected).
Click Deploy — done in ~60 seconds.
SPA routing note: Vercel handles CRA routing automatically.
If you ever eject or move to Vite, add a vercel.json:
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
Project Structure
src/
├── components/   Navbar, ProductCard, ProtectedRoute, Footer
├── contexts/     CartContext (useReducer), AuthContext
├── pages/        Home, Shop, ProductDetail, Cart, Checkout, Login, Contact
├── utils/        formatCurrency.js
├── App.jsx       Router + Provider tree
└── index.js      ReactDOM.createRoot entry
---

## ✅ Quick-start checklist

```bash
mkdir shopzone && cd shopzone
# paste package.json, then:
npx create-react-app . --template cra-template   # scaffolds public/ and src/
# replace src/ and public/index.html with the files above
npm install react-router-dom
npm start
```

That's every file you need. Here's a summary of what each phase delivers:

**Phase 1 (Routing)** — `App.jsx` sets up all 6 routes including the dynamic `/product/:id`. `Shop.jsx` fetches 100 products from dummyjson and filters them client-side.

**Phase 2 (Cart State)** — `CartContext.jsx` uses `useReducer` for clean, predictable mutations. `Navbar.jsx` shows a live badge. `/cart` shows the full order with qty controls.

**Phase 3 (Advanced)** — `localStorage` hydration in both contexts survives page refresh. `AuthContext` provides mock guest login. `ProtectedRoute` redirects unauthenticated users to `/login` and bounces them back after auth using React Router's `location.state`.