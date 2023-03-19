import { Router } from "express";
import ProductManager from "../dao/mongoManagers/productManager.js";
import CartManager from "../dao/mongoManagers/cartManager.js";
import UserManager from "../dao/mongoManagers/usersManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();
const userManager = new UserManager();

const router = Router();

//RealtimeProducts
router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts");
});

//Home
router.get("/home", async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.params;
  const products = await productManager.getProducts(limit, page, sort, query);
  res.render("home", { products: products.docs });
});

//Products
router.get("/products", async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.params;
  const { email } = req.session;
  const user = await userManager.findUser(email);
  const products = await productManager.getProducts(limit, page, sort, query);
  res.render("products", { products: products.docs, user });
});

//Cart
router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  res.render("cart", { cart: cart.products });
});

export default router;
