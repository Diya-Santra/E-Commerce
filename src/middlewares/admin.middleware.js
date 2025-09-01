import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const isAdmin = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new ApiError(401, "not authorized");
  }
  const decoded = jwt.verify(accessToken,process.env.JWT_SECRET);
  if (!decoded) {
    throw new ApiError(401, "not authorized");
  }
  const existingUser = await User.findOne({
    email: decoded.email,
  });

  if (existingUser.role != "admin") {
    throw new ApiError(401, "not authorized");
  }
  req.userid = existingUser._id;
  next();
});
