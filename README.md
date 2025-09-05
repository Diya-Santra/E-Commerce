# 🛒 Ecommerce Backend API

A backend REST API for an *Ecommerce Application* built with *Node.js + Express + MongoDB*.
Implements user management, product catalog, carts, orders, and reviews.
Currently, the API is functional, with *Order Items* and *Payments* modules left as TODO.

---

## 📑 Features Implemented

* *Authentication & Authorization*

  * JWT-based login & registration
  * Role support: customer, seller, admin
* *Users*

  * CRUD for users (admin access)
  * Profile management
* *Products*

  * CRUD for products (sellers/admins)
  * Product listing with filters & pagination
* *Carts*

  * Add, update, remove cart items
  * Clear cart
* *Orders*

  * Create orders from carts
  * Track order status (pending, shipped, delivered, cancelled)
* *Reviews*

  * Customers can add reviews for purchased products
  * Update & delete reviews

---

## 🚧 TODO

* *Order Items*

  * Currently stored within orders, but standalone API routes are not implemented.
  * Planned endpoints:

    * GET /orders/:id/items
    * GET /order-items/:id
* *Payments*

  * Schema is in place (payments collection).
  * Payment flow & routes pending:

    * POST /payments
    * GET /payments/:id
    * PUT /payments/:id/status

---

## 📂 Project Structure


ecommerce-backend/
│── src/
│   ├── models/        # MongoDB models (User, Product, Cart, Order, Review, etc.)
│   ├── routes/        # Express routes
│   ├── controllers/   # Route handlers
│   ├── middlewares/   # Auth, error handling
│   └── utils/         # Helpers (validation, tokens)
│
│── .env.example       # Environment variables
│── package.json
│── README.md


---

## 📌 API Routes

### Auth & Users


POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id


### Products


GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id


### Carts


GET    /carts/me
POST   /carts/me/items
PUT    /carts/me/items/:id
DELETE /carts/me/items/:id
DELETE /carts/me/clear


### Orders


GET    /orders
GET    /users/:id/orders
GET    /orders/:id
POST   /orders
PUT    /orders/:id/status


### Reviews


GET    /products/:id/reviews
POST   /products/:id/reviews
PUT    /reviews/:id
DELETE /reviews/:id


### TODO: Order Items & Payments


# Order Items
GET    /orders/:id/items
GET    /order-items/:id

# Payments
POST   /payments
GET    /payments/:id
PUT    /payments/:id/status


---

## ⚙ Setup & Run

bash
# clone repo
git clone https://github.com/yourname/ecommerce-backend.git
cd ecommerce-backend

# install dependencies
npm install

# set env variables
cp .env.example .env

# run dev server
npm run dev


---

## ✅ Next Steps

* Implement *Order Items* and *Payments* routes
* Add *categories, wishlists, shipping*
* Improve test coverage with Jest