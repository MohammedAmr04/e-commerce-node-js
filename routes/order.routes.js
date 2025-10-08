const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { protect, admin } = require("../middleware/authMiddleware");

// Create order
router.post("/", protect, orderController.createOrder);
// Get my orders
router.get("/myorders", protect, orderController.getMyOrders);
// Get single order
router.get("/:id", protect, orderController.getOrderById);
// Admin: get all orders
router.get("/", protect, admin, orderController.getAllOrders);
// Admin: update order status
router.patch("/:id/status", protect, admin, orderController.updateOrderStatus);

module.exports = router;
