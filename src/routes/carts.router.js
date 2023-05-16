import { Router } from "express";
import {
  addProductToCartController,
  deleteAllProductsController,
  deleteProductFromCartController,
  getCartByIdController,
  updateProductsController,
  updateQuantityOfProductController,
} from "../controllers/cart.controller.js";

import { purchaseController } from "../controllers/purchase.controller.js";
import { authUser } from "../middlewares/current.middleware.js";

const router = Router();
//crear carrito


//obtener carrito mediante id
router.get("/:cid", getCartByIdController);

//agregar producto a un carrito
router.post("/:cid/product/:pid",addProductToCartController);

//eliminar un producto de un carrito
router.delete("/:cid/products/:pid", deleteProductFromCartController);

//eliminar todos los productos del carrito
router.delete("/:cid", deleteAllProductsController);

//actualizar la cantidad de ejemplares del producto que pasen por body
router.put("/:cid/products/:pid", updateQuantityOfProductController);

//actualiza carrito
router.put("/:cid", updateProductsController);

//purchase
router.get("/:cid/purchase", purchaseController);
export default router;
