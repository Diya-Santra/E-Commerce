import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import User from "../models/users.model";
import { asyncHandler } from "../utils/asyncHandler";

const isLoggedIn = asyncHandler(async (req, res, next) => {
  const accesstoken = req.cookies.accesstoken;
  if (!accesstoken) {
    throw ApiError(401, "not authorized");
  }
  const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
  if (!decoded.username) {
    throw new ApiError(401, "not valid");
  }
  const existingUser = await User.findOne({
    username: decoded.username,
  });
  req.userId = existingUser._id;
  next();
});

export default isLoggedIn;
