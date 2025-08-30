import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isLoggedIn = asyncHandler(async (req, res, next) => {
  const accesstoken = req.cookies.accessToken;
  if (!accesstoken) {
    throw new ApiError(401, "not authorized");
  }
  const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
  if (!decoded.email) {
    throw new ApiError(401, "not valid");
  }
  const existingUser = await User.findOne({
    email: decoded.email,
  });
  req.userId = existingUser._id;
  next();
});

export default isLoggedIn;
