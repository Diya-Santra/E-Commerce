import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  deleteUserByIdController,
  updatePasswordController,
} from "../controllers/users.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import isLoggedIn from "../middlewares/auth.middleware.js";
import { body, param } from "express-validator";

const router = Router();

router.route("/users").get(isAdmin, getAllUsersController);

router.route("/:id").get(isLoggedIn, getUserByIdController);

router.route("/delete/:id").delete(isAdmin, deleteUserByIdController);

router
  .route("/")
  .put(
    body("currentPassword").isString(),
    body("newPassword").isString(),
    isLoggedIn,
    updatePasswordController
  );
export default router;
