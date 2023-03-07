import { Router } from "express";
// import cartManager from "../dao/fileManagers/cartManager.js";
import cartManager from "../dao/mongoManagers/cartManager.js";

const CartManager = new cartManager();

const router = Router();
//crear carrito
router.post("/", async (req, res) => {
  const product = req.body;
  if (Object.keys(product).length === 0 || (!product.id && !product._id)) {
    res.json({
      message:
        "No has ingresado ningun producto o el producto ingresado no tiene Id",
    });
  } else {
    await CartManager.createCart(product);
    res.json({ message: "creaste un nuevo carrito" });
  }
});

//obtener carrito mediante id
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cartFound = await CartManager.getCartById(cid);
  res.json(cartFound);
});

//agregar producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await CartManager.addProduct(cid, pid);
  res.json({ message: "producto agregado al carrito", cart });
});

//eliminar un producto de un carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await CartManager.deleteProductOfCart(cid, pid);
  res.json({ cart });
});

//eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await CartManager.deleteAllProducts(cid);
  res.json({ message: "carrito vaciado con exito", cart });
});

//actualizar la cantidad de ejemplares del producto que pasen por body
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const newQuantity = req.body;
  const cart = await CartManager.updateQuantityOfProduct(
    cid,
    pid,
    newQuantity.quantity
  );
  res.json({ message: "cantidad modificada", cart });
});

//actualiza carrito   PREGUNTAR
router.put("/:cid",async (req, res) => {
  const {cid} = req.params;
  const {newProducts}=req.body;
  const cart = await CartManager.updateProducts(cid,newProducts)
  res.json({cart})
});

export default router;
