import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/products.controller.js";

import { authAdmin } from "../middlewares/current.middleware.js";

const router = Router();

router.get("/", getAllProducts);

router.get("/:pid", getProductById);

router.post("/", authAdmin, addProduct);

router.put("/:pid", authAdmin, updateProduct);

router.delete("/:pid", authAdmin, deleteProduct);

export default router;
