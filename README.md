# 🍕 Pizza-O-Cafe — Food Ordering App

A full-stack online food ordering app built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 📁 Project Structure

```
project/
├── frontend/      → React app (deploy to Vercel)
└── backend/       → Express API (deploy to Render)
```

---

## 🚀 Deploy to Production

### Step 1 — Push to GitHub

1. Create a new repo on GitHub (e.g. `pizza-o-cafe`)
2. In this folder, run:

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/pizza-o-cafe.git
git push -u origin main
```

---

### Step 2 — Deploy Backend to Render

1. Go to [render.com](https://render.com) → **New → Web Service**
2. Connect your GitHub repo
3. Configure:

| Setting | Value |
|---|---|
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

4. Under **Environment Variables**, add every key from `backend/.env.example`:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A long random string |
| `JWT_EXPIRES_IN` | `7d` |
| `RAZORPAY_KEY_ID` | Your Razorpay key |
| `RAZORPAY_KEY_SECRET` | Your Razorpay secret |
| `TWILIO_ACCOUNT_SID` | Your Twilio SID |
| `TWILIO_AUTH_TOKEN` | Your Twilio auth token |
| `TWILIO_WHATSAPP_NUMBER` | `whatsapp:+14155238886` |
| `FRONTEND_URL` | *(leave blank for now — add after Step 3)* |

5. Deploy. Copy the URL Render gives you, e.g. `https://pizza-o-cafe.onrender.com`

---

### Step 3 — Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo
2. Configure:

| Setting | Value |
|---|---|
| **Root Directory** | `frontend` |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

3. Under **Environment Variables**, add:

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://pizza-o-cafe.onrender.com/api` *(your Render URL)* |
| `VITE_RAZORPAY_KEY` | Your Razorpay key ID |

4. Deploy. Copy your Vercel URL, e.g. `https://pizza-o-cafe.vercel.app`

---

### Step 4 — Update CORS in Render

Go back to Render → your backend service → **Environment** and set:

```
FRONTEND_URL = https://pizza-o-cafe.vercel.app
```

Then **redeploy** the backend (Manual Deploy → Deploy latest commit).

---

## 💻 Local Development

### Backend
```bash
cd backend
npm install
cp .env.example .env    # fill in your values
npm run dev             # runs on http://localhost:5000
```

Seed the database (creates admin + sample products):
```bash
npm run seed
# Admin login: admin@yourapp.com / ChangeMe@123
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local   # set VITE_API_URL=http://localhost:5000/api
npm run dev                   # runs on http://localhost:3000
```

---

## ✅ Health Check

After deploying backend, visit:
```
https://your-app.onrender.com/api/health
```
Should return `{ "success": true, "message": "Food Ordering API is running" }`

---

## 🔑 API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | — | Health check |
| POST | `/api/auth/login` | — | Admin login |
| GET | `/api/products` | — | List products |
| GET | `/api/products/categories` | — | List categories |
| POST | `/api/orders` | — | Place order |
| GET | `/api/orders/:id` | — | Track order |
| POST | `/api/payments/create-order` | — | Create Razorpay order |
| POST | `/api/payments/verify` | — | Verify payment |
| GET | `/api/admin/stats` | Admin | Dashboard stats |
