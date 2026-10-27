# LaptopWise — MERN Laptop Recommendation System

A beginner-friendly college project built with MongoDB, Express, React, and Node.js.

## Requirements
- Node.js 20+ and npm
- MongoDB local installation or a MongoDB Atlas connection string

## 1. Project structure
```text
LaptopWise/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── data/seedLaptops.js
│   │   ├── middleware/auth.js
│   │   ├── models/Laptop.js
│   │   ├── models/User.js
│   │   ├── models/Recommendation.js
│   │   ├── routes/authRoutes.js
│   │   ├── routes/laptopRoutes.js
│   │   ├── routes/recommendationRoutes.js
│   │   ├── services/recommendationService.js
│   │   ├── controllers/authController.js
│   │   ├── controllers/laptopController.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/Navbar.jsx
    │   ├── context/AuthContext.jsx
    │   ├── pages/Home.jsx
    │   ├── pages/Catalogue.jsx
    │   ├── pages/Recommend.jsx
    │   ├── pages/LaptopDetails.jsx
    │   ├── pages/Login.jsx
    │   ├── pages/Register.jsx
    │   ├── services/api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    ├── .env.example
    └── package.json
```

## 2. Start the backend
Open a terminal:
```bash
cd LaptopWise/backend
npm install
```
Copy `.env.example` to `.env`, then update `MONGO_URI` and `JWT_SECRET`.

For local MongoDB, a typical URI is:
`mongodb://127.0.0.1:27017/laptopwise`

Start the API:
```bash
npm run dev
```
The backend runs at `http://localhost:5000`. On its first start it inserts sample laptops if the collection is empty.

## 3. Start the frontend
Open a second terminal:
```bash
cd LaptopWise/frontend
npm install
```
Copy `.env.example` to `.env`, then run:
```bash
npm run dev
```
Open the URL printed by Vite, normally `http://localhost:5173`.

## API overview
- `GET /api/health` — check server status
- `GET /api/laptops` — list laptops; supports `search`, `brand`, `type`, `ram`, `maxPrice`, and `sort`
- `GET /api/laptops/:id` — laptop details
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — sign in
- `GET /api/auth/me` — current user (JWT required)
- `POST /api/recommendations` — rank laptops for a set of preferences
- `GET /api/recommendations/history` — recommendation history (JWT required)
- `GET /api/auth/favourites` — user's saved laptops (JWT required)
- `POST /api/auth/favourites/:laptopId` — add favourite (JWT required)
- `DELETE /api/auth/favourites/:laptopId` — remove favourite (JWT required)

## Recommendation logic
`backend/src/services/recommendationService.js` calculates a weighted score from budget fit, RAM, storage, processor, graphics, intended use, and portability. Scores are normalized to 100 and results include human-readable reasons. This is a transparent scoring system, not an ML model.

## Notes
- Use your own MongoDB URI and a long random JWT secret. Never commit `.env`.
- Sample products are illustrative demo data. Verify live prices and exact specifications before treating them as current shopping advice.
- This is a learning project. Before public deployment, add rate limiting, stricter validation, security headers, and production-grade token handling.
