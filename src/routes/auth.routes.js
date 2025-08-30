import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";
import isLoggedIn from "../middlewares/auth.middleware.js";
const router = Router();

router
  .route("/register")
  .post(
    body("username"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Please enter a password more than 8"),
    registerController
  );

router
  .route("/login")
  .post(
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .notEmpty()
      .withMessage("Please Enter password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters"),
    loginController
  );

router.route("/refresh").post(refreshTokenController);


router.route("/logout").post(isLoggedIn,logoutController);

export default router;
