import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import products from "../models/products.model.js";

//create product controller
export const createProductController = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "validation error", errors.array);
  }
  if (typeof parseInt(req.body.stock) != "number") {
    throw new ApiError(400, "Inavlid stock");
  }
  if (parseInt(req.body.stock) < 0) {
    throw new ApiError(400, "Invalid stock value");
  }
  const product_image = req.file;
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
  if (!ALLOWED_FILE_TYPES.includes(product_image.mimetype)) {
    throw new ApiError(400, "Inavaid file type");
  }

  const imageUrl = await uploadToCloudinary(product_image.path);
  const { name, description, price, category, stock } = req.body;
  const seller_id = req.userid;

  const productCreated = await products.create({
    seller_id,
    name,
    description,
    price,
    category,
    stock: parseInt(stock),
    product_image: imageUrl,
  });

  return res.json(new ApiResponse(200, productCreated));
});

//getting product details by ID
export const productDetailsBYIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await products.findById(id);
  if (!product) {
    throw new ApiError(400, "product not found");
  }
  res.json(new ApiResponse(200, product));
});

//delete product by ID
export const deleteProductByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await products.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(400, "product not found");
  }
  res.json(new ApiResponse(200, "deleted succesfully"));
});

//getting all products
export const getAllProductsController = asyncHandler(async (req, res) => {
  const allProducts = await products.find({});
  res.json(new ApiResponse(200, allProducts));
});

//updating product by id
export const updateProductByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const imageUrl = await uploadToCloudinary(req.file.path);
  const { name, description, price, category, stock } = req.body;
  const product = await products.findByIdAndUpdate(
    id,
    {
      seller_id: req.userid,
      name,
      description,
      price,
      category,
      stock: parseInt(stock),
      product_image: imageUrl,
    },
    { new: true }
  );
  if (!product) {
    throw new ApiError(400, "product not found");
  }
  res.json(new ApiResponse(200, product));
});

//get list of products by a seller ID
export const getAllProductsBySellerIdController = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const product = await products.findOne({ seller_id: id });
    if (!product) {
      throw new ApiError(400, "product not found");
    }
    res.json(new ApiResponse(200, product));
  }
);
