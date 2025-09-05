import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import products from "../models/products.model.js";
import cartItems from "../models/cart_items.model.js";
import cart from "../models/carts.model.js";

//adding a product to cart
export const addItemToCartController = asyncHandler(async (req, res) => {
  const { quantity, product_id } = req.body;
  const userId = req.userId;
  const ifProductExist = await products.findById(product_id);
  if (!ifProductExist) {
    throw new ApiError(400, "product doesn't exist");
  }
  if (ifProductExist.stock < quantity) {
    throw new ApiError(400, "Not enough stock available");
  }
  const ifProductExistInCart = await cartItems.findOne({
    $and: [{ user_id: userId }, { product_id }],
  });
  console.log(ifProductExistInCart);
  if (ifProductExistInCart) {
    throw new ApiError(401, "product already exist");
  } else {
    const newCartItem = await cartItems.create({
      user_id: userId,
      quantity,
      product_id,
    });
    return res.json(new ApiResponse(200, newCartItem));
  }
});

//update a product to cart
export const updateProductInCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const { quantity } = req.body;
  const ifProductExist = await products.findById(id);
  if (!ifProductExist) {
    throw new ApiError(400, "product doesn't exist");
  }
  if (ifProductExist.stock < quantity) {
    throw new ApiError(400, "Not enough stock available");
  }
  const ifProductExistInCart = await cartItems.findOne({
    $and: [{ user_id: userId }, { product_id: id }],
  });
  if (!ifProductExistInCart) {
    throw new ApiError(401, "product doesn't exist in cart");
  }
  const updateProductInCart = await cartItems.findOneAndUpdate(
    { user_id: userId, product_id: id },
    { quantity },
    { new: true }
  );
  return res.json(new ApiResponse(200, updateProductInCart));
});

//delete cart item
export const deleteCartItemController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const ifProductExist = await products.findById(id);
  if (!ifProductExist) {
    throw new ApiError(400, "product doesn't exist");
  }
  const ifProductExistInCart = await cartItems.findOne({
    $and: [{ user_id: userId }, { product_id: id }],
  });
  if (!ifProductExistInCart) {
    throw new ApiError(401, "product doesn't exist in cart");
  }
  const deleteProduct = await cartItems.deleteOne({
    user_id: userId,
    product_id: id,
  });
  return res.json(new ApiResponse(200, "deleted succesfully"));
});

//delete all items in a cart
export const deleteAllItemController=asyncHandler(async(req,res)=>{
    const userId = req.userId;
    const deleteAll=await cartItems.deleteMany({user_id:userId})
    return res.json(new ApiResponse(200,"deleted all items succefully"))
})

//getting all items 
export const gettingAllItemsController=asyncHandler(async(req,res)=>{
    const userId = req.userId;
    const getAllItems=await cartItems.find({user_id:userId})
    return res.json(new ApiResponse(200,getAllItems))
})