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
| **AI** | Google Gemini API (`@google/generative-ai`) |

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
│   │   ├── authController.js    # Register, Login, GetMe
│   │   └── aiController.js      # Gemini AI travel planner
│   ├── routes/
│   │   ├── homestays.js
│   │   ├── bookings.js
│   │   ├── auth.js
│   │   └── ai.js                # POST /api/ai/planner
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
| **Password Hashing** | bcryptjs with 12 salt rounds using a Mongoose pre-save hook |
| **JWT Authentication** | jsonwebtoken with 7-day expiration |
| **Input Validation** | express-validator for name, email, and password validation |
| **Rate Limiting** | express-rate-limit (5 authentication requests per 15 minutes) |
| **Google OAuth** | passport-google-oauth20 (enabled when Google OAuth credentials are configured) |
| **Admin Access** | Users signing in with the configured admin email are automatically assigned the `admin` role |
| **CORS** | Configured to allow requests only from the frontend application origin |

---

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Authenticate user and return JWT |
| GET | `/api/auth/me` | Yes | Get the authenticated user's profile |
| GET | `/api/auth/google` | No | Start Google OAuth authentication |
| GET | `/api/auth/google/callback` | No | Google OAuth callback |

---

### Homestays

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/homestays` | No | Retrieve all homestays |
| GET | `/api/homestays/:id` | No | Retrieve a homestay by ID |
| GET | `/api/homestays/search?q=` | No | Search homestays by name or location |
| POST | `/api/homestays` | Yes (Admin Only) | Create a new homestay |
| PUT | `/api/homestays/:id` | Yes (Admin Only) | Update an existing homestay |
| DELETE | `/api/homestays/:id` | Yes (Admin Only) | Delete a homestay |

---

### Bookings

> **Verify these routes with your backend.** If they are protected (which is recommended), use the table below.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/bookings` | Yes | Retrieve bookings for the authenticated user |
| GET | `/api/bookings/:id` | Yes | Retrieve a booking by ID |
| POST | `/api/bookings` | Yes | Create a new booking |
| DELETE | `/api/bookings/:id` | Yes | Cancel/Delete a booking |

---

### Frontend Authentication

- **AuthContext** — Centralized authentication state management
- **ProtectedRoute** — Redirects unauthenticated users to `/login`
- **JWT Storage** — Authentication token stored securely in `localStorage`
- **Axios Interceptor** — Automatically attaches the JWT Bearer token to authenticated requests

### Protected Frontend Routes

- `/dashboard`
- `/settings`
- `/my-bookings`


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

## Deployment

### Required environment variables

Backend:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`
- `GEMINI_API_KEY`
- `ADMIN_EMAIL`

Frontend:
- `VITE_API_URL`

### Frontend deployment (Vercel)
1. Build the frontend from the project root with `npm install` and `npm run build`.
2. Create a Vercel project and set the build command to `npm run build`.
3. Set the environment variable `VITE_API_URL` to your deployed backend URL, for example `https://your-backend.onrender.com/api`.
4. Deploy the app and verify the production frontend can reach the API.

### Backend deployment (Render)
1. Create a Render web service for the backend folder.
2. Set the start command to `npm start`.
3. Configure the environment variables listed above, including `FRONTEND_URL` set to your Vercel frontend URL.
4. Ensure `GOOGLE_CALLBACK_URL` matches the deployed backend callback route, such as `https://your-backend.onrender.com/api/auth/google/callback`.

### Production build commands
```bash
npm install
npm run build
cd backend && npm install
```

### Known free-tier limitations
- Render free tier may sleep after inactivity, so the first request can take longer.
- Vercel free tier may have cold starts and limited build minutes.
- MongoDB Atlas free tier has usage limits and may require an IP allowlist configuration.
- Google OAuth credentials must be configured for the production callback URL to work.
| `GOOGLE_CALLBACK_URL` | No | Google OAuth callback URL |
| `GEMINI_API_KEY` | Yes (for AI) | Google Gemini API key for AI Travel Planner |

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

## AI Travel Planner

### Backend AI Integration

| Feature | Implementation |
|---------|---------------|
| **AI Model** | Google Gemini 2.0 Flash (`@google/generative-ai`) |
| **Endpoint** | `POST /api/ai/planner` |
| **Input** | destination, days, budget, travelStyle |
| **Output** | Day-wise itinerary, food recommendations, eco-tips, summary |
| **Prompt Engineering** | Role-based prompt with strict JSON enforcement (see `PROMPTS.md`) |

### API Endpoint

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/ai/planner` | No | Generate AI travel plan |

#### Example Request
```json
POST /api/ai/planner
{
  "destination": "Manali, India",
  "days": 3,
  "budget": "moderate",
  "travelStyle": "adventure"
}
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "destination": "Manali, India",
    "days": 3,
    "budget": "moderate",
    "travelStyle": "adventure",
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival & Local Exploration",
        "morning": "Morning activity description",
        "afternoon": "Afternoon activity description",
        "evening": "Evening activity description",
        "dailyBudget": "₹2,500 - ₹3,000"
      }
    ],
    "foodRecommendations": ["Local food 1", "Local food 2"],
    "ecoFriendlyTips": ["Eco tip 1", "Eco tip 2"],
    "travelSummary": "A summary of the trip."
  }
}
```

### Frontend AI Planner

- **Page**: `src/pages/AIPlanner.jsx` — Input form + results display
- **API Service**: `src/services/api.js` — `generateTravelPlan()` function
- **Loading**: Uses existing `Loader` component with disabled button
- **Errors**: Toast notifications via `showError()` on failure

### Setup

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Add it to `backend/.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Restart the backend server

### Prompt Engineering

See `PROMPTS.md` for detailed prompt engineering documentation, including three prompt versions and why role-based prompting with strict JSON enforcement gives the best results.

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

# Deployment Documentation

## Live URLs

### Frontend
- Live URL: https://ecostay-connect.vercel.app/

### Backend
- Live API URL: https://ecostay-connect.onrender.com

---

## Tech Stack Summary

### Frontend
- React.js (React 19)
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- React Hot Toast
- React Hook Form

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Passport.js (Google OAuth)
- Express Validator
- Express Rate Limiter

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Known Limitations on Free Tier

### Backend (Render Free Tier)
- The Render free tier automatically spins down the backend service after a period of inactivity.
- The first request after inactivity may take approximately 30–60 seconds because the server needs to wake up.
- Limited CPU and memory resources are available compared to paid plans.

### Database (MongoDB Atlas Free Tier)
- Free cluster has limited storage and performance capacity.
- Database performance may reduce with high traffic or large amounts of data.

### Frontend (Vercel Free Tier)
- Suitable for personal projects and small-scale deployments.
- Usage limits apply for bandwidth and build minutes.