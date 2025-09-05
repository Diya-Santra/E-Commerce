import { Router } from "express";
import isLoggedIn from "../middlewares/auth.middleware.js";
import {
  createReviewController,
  updateReviewsController,
  deleteReviewControlle,
  getAllReviewsController,
} from "../controllers/reviews.controller.js";

const router = Router();

//creating review
router.route("/create/:id").post(isLoggedIn, createReviewController);

//update review
router.route("/update/:id").put(isLoggedIn, updateReviewsController);

//delete review route
router.route("/delete/:id").delete(isLoggedIn, deleteReviewControlle);

//getting all reviews for a product
router.route("/reviews/:id").get(getAllReviewsController);
export default router;
