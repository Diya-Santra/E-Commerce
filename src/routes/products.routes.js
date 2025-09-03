import { Router } from "express";
import { isSeller } from "../middlewares/isSeller.middleware.js";
import { upload } from "../utils/multer.js";
import {
  createProductController,
  deleteProductByIdController,
  productDetailsBYIdController,
  getAllProductsController,
  updateProductByIdController,
  getAllProductsBySellerIdController,
} from "../controllers/product.controller.js";
import { body, check } from "express-validator";

const router = Router();

//craete product router
router.route("/").post(
  isSeller,
  upload.single("product_image"),
  check("product_image")
    .custom((value, { req }) => {
      if (
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/png"
      ) {
        return true; // return "non-falsy" value to indicate valid data"
      } else {
        return false; // return "falsy" value to indicate invalid data
      }
    })
    .withMessage("Plese submit a image file"),
  body("name").isString(),
  body("description").isString(),
  body("price").isString(),
  body("category").isString(),
  body("stock").isString(),
  createProductController
);

export default router;

//getting product by ID router
router.route("/products/:id").get(productDetailsBYIdController);

//delete product
router
  .route("/products/delete/:id")
  .delete(isSeller, deleteProductByIdController);

//getting all products route
router.route("/products").get(getAllProductsController);

//updating products
router
  .route("/products/update/:id")
  .put(isSeller, upload.single("product_image"), updateProductByIdController);

//getting product by seller ID
router
  .route("/products/sellerProduct/:id")
  .get(isSeller, getAllProductsBySellerIdController);
