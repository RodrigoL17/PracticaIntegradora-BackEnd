import { Router } from "express";
// import cartManager from "../dao/fileManagers/cartManager.js";
import cartManager from "../dao/mongoManagers/cartManager.js";

const CartManager = new cartManager();

const router = Router();

router.post("/", async (req, res) => {
  const product = req.body;
  if (Object.keys(product).length === 0 || (!product.id && !product._id)) {
    res.json({ message: "No has ingresado ningun producto o el producto ingresado no tiene Id" });
  } else {
    await CartManager.createCart(product);
    res.json({ message: "creaste un nuevo carrito" });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cartFound = await CartManager.getCartById(cid);
  const products = cartFound.products;
  res.json({ message: "carrito encontrado", products });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  await CartManager.addProduct(cid, pid);
  res.json({ message: "producto agregado al carrito" });
});

export default router;
