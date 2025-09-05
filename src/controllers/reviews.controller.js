import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import reviews from "../models/reviews.model.js";
import User from "../models/users.model.js";
import products from "../models/products.model.js";

//creating a review for  a product
export const createReviewController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { rating, comment } = req.body;
  const isExist = await products.findById(id);
  if (!isExist) {
    throw new ApiError(400, "Product doesn't exist");
  }
  const isReviewed = await reviews.findOne({ product: id, user: userId });
  if (isReviewed) {
    throw new ApiError(401, "already reviewed");
  }
  const review = await reviews.create({
    product_id: id,
    user_id: userId,
    rating,
    comment,
  });
  res.json(new ApiResponse(200, review));
});

//update all review for a product
export const updateReviewsController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const isExist = await products.findById(id);
  if (!isExist) {
    throw new ApiError(400, "Product doesn't exist");
  }
  const { rating, comment } = req.body;
  const review = await reviews.findOneAndUpdate(
    { product_id: id, user_id: userId },
    {
      rating,
      comment,
    },
    { new: true }
  );
  res.json(new ApiResponse(200, review));
});

//delete a review
export const deleteReviewControlle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isExist = await reviews.findById(id);
  if (!isExist) {
    throw new ApiError(400, "review doesn't exist");
  }
  const review = await reviews.findByIdAndDelete(id);
  res.json(new ApiResponse(200, "deleted successfully"));
});

//get all reviews for a product
export const getAllReviewsController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isExist = await products.findById(id);
  if (!isExist) {
    throw new ApiError(400, "product doesn't exist");
  }
  const allReview = await reviews.find({ product_id: id });
  res.json(new ApiResponse(200, allReview));
});
