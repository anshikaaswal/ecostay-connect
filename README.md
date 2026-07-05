# EcoStay Connect

A full-stack **Homestay & Eco-Tourism Platform** built with React, Node.js, Express, and MongoDB.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite + Tailwind CSS v4 |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas (NoSQL) |
| **ODM** | Mongoose |

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
│   │   │   └── Footer.jsx
│   │   ├── pages/               # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── HomestayDetail.jsx
│   │   │   └── AIPlanner.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── backend/                     # Express + MongoDB backend
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── Homestay.js          # Mongoose schema
│   │   ├── Booking.js           # Mongoose schema
│   │   └── User.js              # Mongoose schema
│   ├── controllers/
│   │   ├── homestayController.js
│   │   └── bookingController.js
│   ├── routes/
│   │   ├── homestays.js
│   │   └── bookings.js
│   ├── middleware/
│   │   └── errorHandler.js
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

┌─────────────────────┐
│       User          │
├─────────────────────┤
│ _id (ObjectId)      │
│ name (String)       │
│ email (String)      │
│ password (String)   │
│ createdAt (Date)    │
│ updatedAt (Date)    │
└─────────────────────┘
```

## API Endpoints

### Homestays
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/homestays` | Get all homestays |
| GET | `/api/homestays/:id` | Get homestay by ID |
| GET | `/api/homestays/search?q=` | Search by name/location |
| POST | `/api/homestays` | Create a homestay |
| PUT | `/api/homestays/:id` | Update a homestay |
| DELETE | `/api/homestays/:id` | Delete a homestay |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all bookings |
| GET | `/api/bookings/:id` | Get booking by ID |
| POST | `/api/bookings` | Create a booking |
| DELETE | `/api/bookings/:id` | Delete a booking |

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

## Features

- Browse eco-friendly homestays with detailed information
- Search homestays by name or location
- Book homestays with date selection
- User dashboard with booking history and saved homestays
- AI-powered travel recommendations
- Dark/Light mode with persistent theme
- Responsive design (mobile, tablet, desktop)
- Toast notifications for user actions