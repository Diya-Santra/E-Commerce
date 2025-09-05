import { Router } from "express";
import {
  addItemToCartController,
  updateProductInCart,
  deleteCartItemController,
  deleteAllItemController,
  gettingAllItemsController,
} from "../controllers/cart.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";
import { body } from "express-validator";

const router = Router();

//adding item to cart
router
  .route("/add")
  .post(
    isLoggedIn,
    body("quantity"),
    body("product_id"),
    addItemToCartController
  );

//update
router
  .route("/update/:id")
  .put(isLoggedIn, body("quantity"), updateProductInCart);

//delete
router.route("/delete/:id").delete(isLoggedIn, deleteCartItemController);

//delete all items
router.route("/empty").delete(isLoggedIn, deleteAllItemController);

//get all items
router.route("/all").get(isLoggedIn, gettingAllItemsController);

export default router;
