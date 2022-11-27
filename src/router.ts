import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { Router } from "express";
import { body, validationResult, check, oneOf } from "express-validator";
import { handleInputError } from "./modules/middleware";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdate,
  getUpdateById,
  updateByUpdate,
} from "./handlers/update";

const router = Router();

/***
 * Proudct
 */

router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post(
  "/product",
  body("name").isString(),
  handleInputError,
  createProduct
);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputError,
  updateProduct
);

router.delete("/product/:id", () => {});

/***
 * Update
 */

router.get("/update", getAllUpdate);
router.get("/update/:id", getUpdateById);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").optional(),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  updateByUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update Points
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  handleInputError,
  () => {}
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputError,
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
