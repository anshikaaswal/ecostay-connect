# EcoStay Connect

A full-stack **Homestay & Eco-Tourism Platform** built with React, Node.js, Express, and MongoDB.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite + Tailwind CSS v4 |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas (NoSQL) |
| **ODM** | Mongoose 9 |
| **Authentication** | JWT + bcryptjs + Passport.js (Google OAuth) |

## Why MongoDB?

MongoDB was chosen for this project because:

- **Flexible Schema** — Homestay listings have varying amenities, images, and descriptions. MongoDB's document model allows each listing to have its own structure without rigid migrations.
- **Scalability** — As the platform grows with more homestays, bookings, and users, MongoDB scales horizontally with ease.
- **Geospatial Queries** — Future features like "find homestays near me" can leverage MongoDB's built-in geospatial indexing.
- **JSON-like Documents** — Data stored as BSON maps naturally to JavaScript objects, reducing impedance mismatch between the API and database layers.

## Project Structure

```
ecostay-connect/
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/              # Button, Input, Modal, Loader, Toast
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state management
│   │   ├── pages/               # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── HomestayDetail.jsx
│   │   │   └── AIPlanner.jsx
│   │   ├── services/
│   │   │   └── api.js           # Axios API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── backend/                     # Express + MongoDB backend
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── passport.js          # Google OAuth strategy
│   ├── models/
│   │   ├── Homestay.js          # Mongoose schema
│   │   ├── Booking.js           # Mongoose schema
│   │   └── User.js              # Mongoose schema (with bcrypt hashing)
│   ├── controllers/
│   │   ├── homestayController.js
│   │   ├── bookingController.js
│   │   └── authController.js    # Register, Login, GetMe
│   ├── routes/
│   │   ├── homestays.js
│   │   ├── bookings.js
│   │   └── auth.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── authMiddleware.js    # JWT protect + adminOnly
│   │   ├── validators.js        # express-validator rules
│   │   └── rateLimiter.js       # express-rate-limit
│   ├── data/                    # Legacy in-memory data (replaced by MongoDB)
│   ├── seed.js                  # Database seeder
│   ├── server.js                # Entry point
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## Schema Diagram

```
┌─────────────────────┐       ┌─────────────────────┐
│      Homestay       │       │      Booking        │
├─────────────────────┤       ├─────────────────────┤
│ _id (ObjectId)      │       │ _id (ObjectId)      │
│ name (String)       │       │ userName (String)   │
│ location (String)   │       │ email (String)      │
│ price (Number)      │◄──────│ homestay (ObjectId) │
│ rating (Number)     │  ref  │ checkIn (Date)      │
│ image (String)      │       │ checkOut (Date)     │
│ description (String)│       │ guests (Number)     │
│ amenities [String]  │       │ status (String)     │
│ createdAt (Date)    │       │ createdAt (Date)    │
│ updatedAt (Date)    │       │ updatedAt (Date)    │
└─────────────────────┘       └─────────────────────┘
    
┌─────────────────────────┐
│         User            │
├─────────────────────────┤
│ _id (ObjectId)          │
│ name (String)           │
│ email (String, unique)  │
│ password (String, hash) │
│ role (String: user/admin)│
│ googleId (String, opt)  │
│ avatar (String, opt)    │
│ createdAt (Date)        │
│ updatedAt (Date)        │
└─────────────────────────┘
```

## Authentication System (Week 6)

### Backend Authentication

| Feature | Implementation |
|---------|---------------|
| **Password Hashing** | bcryptjs with 12 salt rounds (Mongoose 9 pre-save hook) |
| **JWT Tokens** | jsonwebtoken with 7-day expiry |
| **Input Validation** | express-validator (name, email, password) |
| **Rate Limiting** | express-rate-limit (5 requests per 15 min on auth) |
| **Google OAuth** | passport-google-oauth20 (optional, requires credentials) |
| **CORS** | Restricted to frontend origin only |

### API Endpoints

#### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | Yes | Get current user profile |
| GET | `/api/auth/google` | No | Google OAuth login |
| GET | `/api/auth/google/callback` | No | Google OAuth callback |

#### Homestays
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/homestays` | No | Get all homestays |
| GET | `/api/homestays/:id` | No | Get homestay by ID |
| GET | `/api/homestays/search?q=` | No | Search by name/location |
| POST | `/api/homestays` | Admin | Create a homestay |
| PUT | `/api/homestays/:id` | Admin | Update a homestay |
| DELETE | `/api/homestays/:id` | Admin | Delete a homestay |

#### Bookings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/bookings` | No | Get all bookings |
| GET | `/api/bookings/:id` | No | Get booking by ID |
| POST | `/api/bookings` | Yes | Create a booking |
| DELETE | `/api/bookings/:id` | Yes | Delete a booking |

### Frontend Authentication

- **AuthContext** — Global auth state with login, logout, and token management
- **ProtectedRoute** — Redirects unauthenticated users to `/login`
- **JWT Storage** — Token stored in localStorage
- **Axios Interceptor** — Automatically attaches `Bearer` token to requests

#### Protected Frontend Routes
- `/dashboard` — Requires authentication
- `/settings` — Requires authentication

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- npm

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecostay-connect
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:5173

# Optional: Google OAuth Credentials
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
# GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### 3. Seed the Database
```bash
cd backend
npm run seed
```
This inserts 6 homestays and 3 bookings into MongoDB.

### 4. Start the Backend Server
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

### 5. Frontend Setup
```bash
# From the root directory
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Running the Application

1. Start the backend: `cd backend && npm run dev`
2. Start the frontend: `npm run dev` (from root)
3. Open `http://localhost:5173` in your browser

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | Yes | Backend server port (default: 5000) |
| `MONGO_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Secret key for JWT signing |
| `FRONTEND_URL` | Yes | Frontend URL for CORS |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | No | Google OAuth callback URL |

## Features

- Browse eco-friendly homestays with detailed information
- Search homestays by name or location
- **User Registration & Login** with JWT authentication
- **Google OAuth** login (when configured)
- **Protected Routes** — Dashboard and Settings require login
- Book homestays with date selection (requires authentication)
- **Rate Limiting** — 5 login attempts per 15 minutes
- **Admin-only** homestay CRUD operations
- User dashboard with booking history and saved homestays
- AI-powered travel recommendations
- Dark/Light mode with persistent theme
- Responsive design (mobile, tablet, desktop)
- Toast notifications for user actions

## API Response Examples

### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
// Response: 201
{
  "success": true,
  "message": "User registered successfully"
}
```

### Login User
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secure123"
}
// Response: 200
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Protected Route (No Token)
```json
GET /api/auth/me
// Response: 401
{
  "success": false,
  "message": "Unauthorized: No token provided"
}
```

### Rate Limited
```json
// After 5+ attempts in 15 minutes
// Response: 429
{
  "success": false,
  "message": "Too many attempts, please try again after 15 minutes"
}
```

## Files Created/Modified (Week 6)

### New Files
- `backend/models/User.js` — User schema with bcrypt hashing
- `backend/controllers/authController.js` — Register, Login, GetMe
- `backend/routes/auth.js` — Auth route definitions
- `backend/middleware/authMiddleware.js` — JWT protect + adminOnly
- `backend/middleware/validators.js` — express-validator rules
- `backend/middleware/rateLimiter.js` — Rate limiting config
- `backend/config/passport.js` — Google OAuth strategy
- `src/context/AuthContext.jsx` — Auth state management
- `src/components/ProtectedRoute.jsx` — Route protection

### Modified Files
- `backend/server.js` — Added auth routes, CORS config, Passport init
- `backend/routes/bookings.js` — Added auth middleware
- `backend/routes/homestays.js` — Added auth middleware for admin
- `backend/.env.example` — Added JWT_SECRET, FRONTEND_URL, Google OAuth
- `src/services/api.js` — Added auth APIs, axios interceptor
- `src/App.jsx` — Added AuthProvider, ProtectedRoute wrappers
- `src/pages/Login.jsx` — Connected to backend, register mode, Google button
- `src/pages/HomestayDetail.jsx` — Fixed booking payload, requires auth
- `src/components/Navbar.jsx` — Shows user info, logout button
- `README.md` — Updated documentation

## Testing Checklist

- [x] Register new user works
- [x] Password stored hashed in MongoDB
- [x] Login returns JWT token
- [x] Protected API without token gives 401
- [x] Protected API with token works
- [x] Dashboard redirects when logged out
- [x] Booking works after login
- [x] Rate limiting returns 429 after repeated attempts
- [x] Admin-only routes require admin role