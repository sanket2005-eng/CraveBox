# CraveBox — Food Ordering App

A full-stack food ordering application with a React/Vite frontend and Node.js/Express/MongoDB backend.

---

## Project Structure

```
project/
├── frontend/          # React + Vite + Tailwind CSS
└── backend/           # Node.js + Express + MongoDB
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev        # starts at http://localhost:5173
```

### Build for production
```bash
npm run build
```

---

## Backend Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

Required `.env` variables:
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `RAZORPAY_KEY_ID` | Razorpay API key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |
| `TWILIO_ACCOUNT_SID` | Twilio Account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_WHATSAPP_NUMBER` | Twilio WhatsApp number |
| `FRONTEND_URL` | Frontend URL for CORS (default: http://localhost:5173) |

### 3. Seed the database (optional)
```bash
npm run seed
# Creates a super admin and sample products
# Default admin: admin@foodapp.com / Admin@123456
```

### 4. Start the server
```bash
npm run dev       # development (nodemon)
npm start         # production
```

Server runs at `http://localhost:5000`

---

## API Endpoints

### Auth
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | /api/auth/login | Admin login | Public |
| GET | /api/auth/me | Get current admin | Protected |

### Products
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | /api/products | Get all products | Public |
| GET | /api/products/categories | List categories | Public |
| GET | /api/products/category/:cat | Products by category | Public |
| GET | /api/products/:id | Get product | Public |
| POST | /api/products | Create product | Admin |
| PUT | /api/products/:id | Update product | Admin |
| DELETE | /api/products/:id | Delete product | Admin |

### Orders
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | /api/orders | Place order | Public |
| GET | /api/orders | List all orders | Admin |
| GET | /api/orders/:id | Get order by id/orderId | Public |
| PATCH | /api/orders/:id/status | Update order status | Admin |
| DELETE | /api/orders/:id | Delete order | Admin |

### Payments (Razorpay)
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | /api/payments/create-order | Create Razorpay order | Public |
| POST | /api/payments/verify | Verify payment & save order | Public |
| POST | /api/payments/failed | Log payment failure | Public |

### Admin Dashboard
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | /api/admin/stats | Dashboard statistics | Admin |

---

## Bug Fixes Applied

### Frontend
1. **Wrong product images** — Burgers were showing cola/drink images. Fixed image URLs for all burger items.
2. **ProductModal related products** — Clicking a related product called `onClose()` twice but never opened the new product. Fixed with a proper `onSelectProduct` callback.
3. **ProductCard image double-scale** — `motion.img` `whileHover` and CSS `group-hover:scale-110` were both applied, causing double zoom. Removed the redundant Framer Motion scale.
4. **Unused state** — `activeIndex` in `TestimonialsSection` was declared but never used. Removed.
5. **State not reset on product change in ProductModal** — `quantity`, `isAdded`, and `imageLoaded` were not reset when a different product was selected. Added a `useEffect` keyed to `product.id`.

### Backend
1. **Missing `nanoid` dependency** — `order.model.js` imports `nanoid` but it wasn't in `package.json`. Added `"nanoid": "^5.0.7"`.
2. **Route ordering conflict** — In `order.routes.js`, `GET /` (admin list) was registered after `GET /:id` (public track), meaning Express would try to interpret a plain `/` call as `/:id = ""`. Reordered so `GET /` comes first.
