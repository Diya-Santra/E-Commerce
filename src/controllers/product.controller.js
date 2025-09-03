import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import products from "../models/products.model.js";

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
