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

router.get("/:cid", getCartByIdController); //Get cart by Id
router.get("/:cid/purchase", purchaseController); //Make purchase
router.post("/:cid/product/:pid", addProductToCartController); //Add product to cart
router.put("/:cid/products/:pid", updateQuantityOfProductController); //Update quantity of product
router.put("/:cid", updateProductsController); //Bulk update of products in cart
router.delete("/:cid/products/:pid", deleteProductFromCartController); //Delete one product from cart
router.delete("/:cid", deleteAllProductsController); //Delete all products from cart

export default router;
