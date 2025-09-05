import { Router } from "express";
import isLoggedIn from "../middlewares/auth.middleware.js";
import {
  createReviewController,
  updateReviewsController,
  deleteReviewControlle,
  getAllReviewsController,
} from "../controllers/reviews.controller.js";
import { body } from "express-validator";

const router = Router();

//creating review
router
  .route("/create/:id")
  .post(isLoggedIn, body("rating"), body("comment"), createReviewController);

//update review
router
  .route("/update/:id")
  .put(isLoggedIn, body("rating"), body("comment"), updateReviewsController);

//delete review route
router.route("/delete/:id").delete(isLoggedIn, deleteReviewControlle);

//getting all reviews for a product
router.route("/all/:id").get(getAllReviewsController);
export default router;
