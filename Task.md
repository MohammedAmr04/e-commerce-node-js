# 🛒 E-Commerce Backend API (Node.js + Express)

## 🎯 Project Goal

Develop a full-featured RESTful API for an e-commerce platform with user authentication, product management, shopping cart, and order processing functionalities.

---

## ⚙️ Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)
- dotenv
- express-validator
- Multer (File upload for product images)
- Stripe API (Optional: Payment)
- Swagger or Postman (API Documentation)

---

## 🧩 Task Breakdown

### 🚀 Project Setup

- [ ] Initialize `npm`, create basic project structure
- [ ] Connect to MongoDB
- [ ] Setup Express server
- [ ] Environment variable configuration

---

### 👤 Authentication

- [ ] Register new user
- [ ] Login
- [ ] Logout
- [ ] JWT middleware for protected routes
- [ ] Role-based access (admin, customer)

---

### 👥 User Management

- [ ] Get user profile
- [ ] Update profile
- [ ] Delete account
- [ ] Admin: View all users
- [ ] Admin: Ban/delete user

---

### 📦 Product Management

- [ ] Create new product (admin only)
- [ ] Get all products
- [ ] Get product by ID
- [ ] Update product
- [ ] Delete product
- [ ] Filter by category / price
- [ ] Pagination & search
- [ ] Upload product image

---

### 🛒 Cart Management

- [ ] Add product to cart
- [ ] Remove product from cart
- [ ] View cart
- [ ] Update product quantity

---

### 📦 Order Management

- [ ] Create order from cart
- [ ] View user’s orders
- [ ] View single order
- [ ] Admin: View all orders
- [ ] Admin: Update order status (e.g., pending, shipped, delivered)

---

### 💳 Payment Integration (Optional)

- [ ] Stripe payment integration
- [ ] Save payment info (optional)
- [ ] Order confirmation

---

### 🛡️ Middleware

- [ ] JWT Authentication middleware
- [ ] Role authorization middleware
- [ ] Centralized error handling
- [ ] 404 route handler

---

### 🧪 Testing (Optional)

- [ ] Auth route tests
- [ ] Product route tests
- [ ] Order route tests

---

### 📄 Documentation

- [ ] Swagger API documentation or Postman collection
- [ ] Complete `README.md` file
