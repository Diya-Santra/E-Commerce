import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/users.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

//users-list of users
export const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(new ApiResponse(200, users));
});

//getting user by _id
export const getUserByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json(new ApiResponse(403, "Undefined params"));
  }
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  res.json(new ApiResponse(200, user));
});

//delete user
export const deleteUserByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json(new ApiResponse(403, "Undefined id"));
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(400, "user not found");
  }
  res.json(new ApiResponse(200, "Deleted successfully"));
});

//update user
export const updatePasswordController = asyncHandler(async (req, res) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty) {
    throw new ApiError(errors);
  }
  const { currentPassword, newPassword } = req.body;
  const userDetails = await User.findById({
    _id: req.userId,
  });

  const currentPasswordHash = await bcrypt.hash(currentPassword, 10);
  const validate = userDetails.validatePassword(currentPasswordHash);
  if (!validate) {
    throw new ApiError("Invalid Password");
  }
  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  const result = await User.findByIdAndUpdate(
    {
      _id: req.userId,
    },
    {
      password: newPasswordHash,
    }
  );

  if (!result) {
    throw new ApiError("Couldn't able to update password");
  }

  return res.json(new ApiResponse(200, "Password updated"));
});
