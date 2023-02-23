import { Router } from "express";
// import ProductManager from "../dao/fileManagers/productManager.js";
import ProductManager from "../dao/mongoManagers/productManager.js";

const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

export default router;
