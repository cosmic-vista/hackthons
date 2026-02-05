# Farmlok Backend Assignment

This repository contains the backend implementation for Farmlok, a high-performance RESTful API designed for an agricultural marketplace.

## Project Details
- **GitHub Repository**: https://github.com/cosmic-vista/hackthons
- **Live Deployment URL**: https://hackthons.onrender.com/

---

## Core Features
This project addresses the challenges of modern marketplace backends:

- **Secure OAuth 2.0 Authentication**: Integrated Google OAuth 2.0 using passport-google-oauth20. Uses JSON Web Tokens (JWT) for secure, stateless session management.
- **High-Performance APIs**: Database-level indexing on price, category, and text search fields.
- **Redis Caching**: Central caching layer for Product listings and Weather data to reduce database load.
- **Reliability and Resilience**: Weather API integration with axios-retry for automatic exponential backoff.
- **Security Architecture**: Protection against common web vulnerabilities via Helmet and Rate Limiting.

---

## Technical Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.0
- **Database**: MongoDB Atlas
- **Cache**: Redis Cloud
- **Security**: Passport.js, Helmet, Express-Rate-Limit

---

## API Endpoints

### Authentication
- **GET /auth/google**: Initiate Google OAuth Flow.
- **GET /auth/me**: Fetch authenticated user profile (Requires Token).

### Marketplace (Products)
- **GET /api/v1/products**: List all products.
  - Supports query parameters: `search`, `category`, `minPrice`, `maxPrice`, `sort`, `page`, `limit`.
- **GET /api/v1/products/:id**: View specific product details.
- **POST /api/v1/products**: Add a new product (Requires Token).
- **PUT /api/v1/products/:id**: Update product details (Requires Token).
- **DELETE /api/v1/products/:id**: Delete a product (Requires Token).

### External Integrations
- **GET /api/v1/weather?city=cityName**: Get real-time weather (Cached).
- **GET /health**: System uptime and connection status.

---

## How to Use Authentication

To access Private endpoints (Create/Update/Delete Products), follow these steps:

1. **Get Your Token**:
   - Open `https://hackthons.onrender.com/auth/google` in your browser.
   - Log in with your Google account.
   - You will receive a JSON response containing a "token". Copy this string.

2. **Send Requests with the Token**:
   - Include the token in the Authorization Header for private routes.
   - **Key**: Authorization
   - **Value**: Bearer YOUR_JWT_TOKEN_HERE

---

## Installation and Setup

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a .env file in the root with your credentials:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_uri
   REDIS_URL=your_redis_cloud_url
   GOOGLE_CLIENT_ID=your_id
   GOOGLE_CLIENT_SECRET=your_secret
   JWT_SECRET=your_secret
   WEATHER_API_KEY=your_openweather_key
   ```

3. **Run in Development**:
   ```bash
   npm run dev
   ```

---

## Scalability and Performance
The system is built to handle high traffic by offloading read requests to Redis Cloud. Weather data is cached for 1 hour, and product lists for 5 minutes, ensuring minimal latencies and maximum throughput.
