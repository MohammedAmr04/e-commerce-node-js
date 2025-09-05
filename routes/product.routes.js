const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "variantImages", maxCount: 10 },
  ]),
  protect,
  admin,
  createProduct
);
router.patch("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

module.exports = router;
