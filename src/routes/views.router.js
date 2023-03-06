import { Router } from "express";
import ProductManager from "../dao/mongoManagers/productManager.js";

const productManager = new ProductManager();

const router = Router();

//RealtimeProducts
router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts");
});

export default router;

//Home
router.get("/home", async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.query;
  const products = await productManager.getProducts(limit, page, sort, query);
  res.render("home", { products: products.docs });
});

//Products
router.get("/products", async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.query;
  const products = await productManager.getProducts(limit, page, sort, query);
  res.render("");
});
