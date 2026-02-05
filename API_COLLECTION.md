# 🚀 Farmlok API Collection

This document provides a comprehensive guide to all available API endpoints in the Farmlok Backend.

## 🔐 Authentication
All private routes require a Bearer Token in the `Authorization` header.

### 1. Google Login
- **Endpoint:** `GET /auth/google`
- **Description:** Initiates the Google OAuth flow. Open this in your browser.
- **Success:** Redirects to Google login page.

### 2. Get Current User
- **Endpoint:** `GET /auth/me`
- **Auth Required:** Yes
- **Description:** Returns the profile of the currently logged-in user.

---

## 🛒 Marketplace (Products)
The base URL for products is `/api/v1/products`.

### 1. List All Products (with Search & Filters)
- **Endpoint:** `GET /api/v1/products`
- **Auth Required:** No (Cached for 5 mins)
- **Query Parameters:**
  - `search`: Search name, description, or category (e.g., `?search=tomato`)
  - `category`: Filter by category (e.g., `?category=Vegetables`)
  - `minPrice`: Minimum price filter
  - `maxPrice`: Maximum price filter
  - `sort`: Field to sort by (e.g., `-price` for descending, `price` for ascending)
  - `page`: Page number for pagination (Default: 1)
  - `limit`: Items per page (Default: 20)

### 2. Get Single Product
- **Endpoint:** `GET /api/v1/products/:id`
- **Auth Required:** No
- **Description:** Fetch detailed info for a specific product.

### 3. Create Product
- **Endpoint:** `POST /api/v1/products`
- **Auth Required:** Yes
- **Body (JSON):**
```json
{
  "name": "Fresh Organic Spinach",
  "description": "Naturally grown, pesticide-free spinach.",
  "price": 45,
  "category": "Vegetables",
  "stock": 100,
  "location": "Noida"
}
```

### 4. Update Product
- **Endpoint:** `PUT /api/v1/products/:id`
- **Auth Required:** Yes
- **Body (JSON):** Any field you wish to update.

### 5. Delete Product
- **Endpoint:** `DELETE /api/v1/products/:id`
- **Auth Required:** Yes

---

## 🌤️ Weather Service
- **Endpoint:** `GET /api/v1/weather`
- **Auth Required:** No (Cached for 1 hour)
- **Query Parameters:**
  - `city`: Name of the city (e.g., `?city=Delhi`)

---

## 🏥 System Health
- **Endpoint:** `GET /health`
- **Description:** Check if the server and database connections are alive.
