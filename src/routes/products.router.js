import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/products.controller.js";
import { authAdmin } from "../Utilities/Middlewares/current.middleware.js";

const router = Router();

router.get("/", getAllProducts);

router.get("/:pid", getProductById);

router.post("/", addProduct);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);

export default router;
