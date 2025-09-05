const sendResponse = require("../middleware/sendResponse");
const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, variants } = req.body;

    const mainImage = req.files?.mainImage?.[0]?.path || "";
    const variantImages =
      req.files?.variantImages?.map((file) => file.path) || [];

    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      image: mainImage,
      variants: JSON.parse(variants).map((variant, index) => ({
        ...variant,
        image: variantImages[index] || "",
      })),
    });

    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      brand,
      isFeatured,
      status,
      search,
      sortBy = "createdAt",
      order = "desc",
      minPrice,
      maxPrice,
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (status) query.status = status;
    if (isFeatured) query.isFeatured = isFeatured === "true";
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // ✅ price filter
    if (minPrice || maxPrice) {
      query.basePrice = {};
      if (minPrice) query.basePrice.$gte = parseFloat(minPrice);
      if (maxPrice) query.basePrice.$lte = parseFloat(maxPrice);
    }

    // ✅ sorting
    const sortOption = {};
    const allowedSortFields = ["createdAt", "basePrice", "rating"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    sortOption[sortField] = order === "asc" ? 1 : -1;

    // ✅ pagination + limit cap
    const maxLimit = 40;
    const parsedLimit = parseInt(limit);
    const finalLimit = parsedLimit > maxLimit ? maxLimit : parsedLimit;
    const skip = (page - 1) * finalLimit;

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("brand", "name")
        .populate("category", "name")
        .sort(sortOption)
        .skip(skip)
        .limit(finalLimit),
      Product.countDocuments(query),
    ]);

    sendResponse(res, 200, true, "Products fetched successfully", {
      total,
      page: Number(page),
      limit: finalLimit,
      totalPages: Math.ceil(total / finalLimit),
      products,
    });
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Failed to fetch products",
      null,
      error.message
    );
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("brand", "name")
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
