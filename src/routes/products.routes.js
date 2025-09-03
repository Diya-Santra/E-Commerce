import { Router } from "express";
import { isSeller } from "../middlewares/isSeller.middleware.js"
import { upload } from "../utils/multer.js";
import { createProductController } from "../controllers/product.controller.js";
import { body, check } from "express-validator";


const router = Router();

router.route("/").post(isSeller, upload.single("product_image"),
    check("product_image").custom((value, { req }) => {
        if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
            return true; // return "non-falsy" value to indicate valid data"
        } else {
            return false; // return "falsy" value to indicate invalid data
        }
    }).withMessage("Plese submit a image file"),
    body("name").isString(),
    body("description").isString(),
    body("price").isString(),
    body("category").isString(),
    body("stock").isString(),
    createProductController);

export default router;