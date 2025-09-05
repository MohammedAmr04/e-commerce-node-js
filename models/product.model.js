const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    color: { type: String },
    size: { type: String, enum: ["S", "M", "L"] },
    sku: { type: String, unique: true },
    price: { type: Number, min: 0 },
    stock: { type: Number, min: 0, default: 0 },
    status: {
      type: String,
      enum: ["inStock", "outOfStock"],
      default: function () {
        return this.stock > 0 ? "inStock" : "outOfStock";
      },
    },
    image: { type: String },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [2, "Product name must be at least 2 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [3, "Description must be at least 3 characters"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    basePrice: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: function () {
        return this.numReviews > 0
          ? parseFloat((this.totalRating / this.numReviews).toFixed(1))
          : 0;
      },
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["inStock", "outOfStock"],
      require: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    variants: [variantSchema],
  },
  {
    timestamps: true,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("countInStock").get(function () {
  return this.variants.reduce((total, variant) => total + variant.stock, 0);
});

// Generate slug before save
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  const totalStock = this.variants.reduce(
    (total, variant) => total + variant.stock,
    0
  );
  this.status = totalStock > 0 ? "inStock" : "outOfStock";
  next();
});

module.exports = mongoose.model("Product", productSchema);
