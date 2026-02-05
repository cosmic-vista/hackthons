#  hackthons Backend

### **Redefining the Agricultural Marketplace**
hackthons is a production-ready, high-performance RESTful API designed to bridge the gap between farmers and consumers. Built with a focus on **scalability**, **reliability**, and **visual excellence** in architectural design.

---

##  Core Features & Implementation

This project specifically addresses the core challenges of modern marketplace backends:

### **1. Secure OAuth 2.0 Authentication**
- **Strategy**: Integrated Google OAuth 2.0 using `passport-google-oauth20`.
- **Statelessness**: Uses JSON Web Tokens (JWT) for secure, stateless session management.
- **Hoisting Fix**: Custom-built environment configuration to ensure keys are loaded before module initialization.

### **2. High-Performance APIs**
- **Indexing**: Database-level indexing on `googleId`, `price`, and `category` for O(1) and specialized search performance.
- **Redis Caching**: Implemented a central caching layer for Product listings and Weather data to reduce database load and API costs.
- **Optimized Payloads**: Lean JSON responses designed for fast frontend rendering.

### **3. Reliability & Resilience Patterns**
- **External Integration**: Weather API integration with `axios-retry` for automatic exponential backoff on network failures.
- **Defensive Connection**: Multi-layered connection logic for MongoDB and Redis—ensuring the server remains operational even if cache services are temporarily unavailable.
- **Global Error Handling**: Centralized `AppError` class and middleware for consistent, type-safe error responses.

### **4. Security Architecture**
- **Helmet**: Protection against common web vulnerabilities via HTTP header security.
- **Rate Limiting**: Distributed rate limiting to prevent brute-force and DDoS attacks.
- **Input Validation**: Strict Mongoose schema validation for data integrity.

---

## Tech Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.0
- **Database**: MongoDB Atlas (Aggregation & Indexing)
- **Cache**: Redis Cloud (Performance)
- **Security**: Passport.js, Helmet, Express-Rate-Limit

---

##  API Reference

### **Authentication**
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/auth/google` | `GET` | Initiate Google OAuth Flow |
| `/auth/me` | `GET` | Fetch authenticated user profile |

### **Marketplace (Products)**
| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/api/v1/products` | `GET` | Public | List all products (Cached in Redis) |
| `/api/v1/products/:id` | `GET` | Public | View specific product details |
| `/api/v1/products` | `POST` | Private | Add a new product to the catalog |
| `/api/v1/products/:id` | `PUT` | Private | Update product details |

### **Integrations**
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/v1/weather` | `GET` | Get real-time weather by `city` (Cached) |
| `/health` | `GET` | System uptime and connection status |

---
##  How to Use Authentication

## 🔑 How to Use Authentication

To access **Private** endpoints (Create/Update/Delete Products), follow these steps:

### **1. Get Your Token**
- Open your browser and go to: `http://localhost:3000/auth/google` (or your Render URL).
- Log in with your Google account.
- You will receive a JSON response containing a `"token"`. **Copy this string.**

### **2. Send Requests with the Token**
For every request to a "Private" route, you must include the token in the **Authorization Header**.

**Header Format:**
- **Key:** `Authorization`
- **Value:** `Bearer YOUR_JWT_TOKEN_HERE`

### **3. Example (Using cURL)**
```bash
curl -X POST http://localhost:3000/api/v1/products \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Fresh Organic Carrots",
           "description": "Sweet and crunchy",
           "price": 30,
           "category": "Vegetables",
           "stock": 50,
           "location": "Pune"
         }'
```

---

## 🏗️ Installation & Setup

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root:
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

## 🧪 Scalability Proof
The system is built to handle high traffic by offloading repeat read requests to **Redis Labs**. Weather data is cached for **1 hour**, and product lists for **5 minutes**, ensuring minimal latencies and maximum throughput for a growing marketplace.
