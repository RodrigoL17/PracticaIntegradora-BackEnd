import { Router } from "express";
import {
  addProductToCartController,
  createCartController,
  deleteAllProductsController,
  deleteProductFromCartController,
  getCartByIdController,
  updateProductsController,
  updateQuantityOfProductController,
} from "../controllers/cart.controller.js";

const router = Router();
//crear carrito
router.post("/", createCartController);

//obtener carrito mediante id
router.get("/:cid", getCartByIdController);

//agregar producto a un carrito
router.post("/:cid/product/:pid", addProductToCartController); 

//eliminar un producto de un carrito
router.delete("/:cid/products/:pid", deleteProductFromCartController);

//eliminar todos los productos del carrito
router.delete("/:cid", deleteAllProductsController);

//actualizar la cantidad de ejemplares del producto que pasen por body
router.put("/:cid/products/:pid", updateQuantityOfProductController);

//actualiza carrito
router.put("/:cid", updateProductsController);

export default router;
