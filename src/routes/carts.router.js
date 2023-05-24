import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import { purchaseController } from "../controllers/purchase.controller.js";
import { authUser } from "../Utilities/Middlewares/current.middleware.js";

const router = Router();

router.get("/:cid", cartController.getCartById); //Get cart by Id
router.get("/:cid/purchase", purchaseController); //Make purchase       Falta modificar
router.post("/:cid/product/:pid", cartController.addProductToCart); //Add product to cart
router.put("/:cid/products/:pid", cartController.updateQuantityOfProductFromCart); //Update quantity of product
router.delete("/:cid/product/:pid", cartController.deleteProductFromCart); //Delete one product from cart
router.delete("/:cid", cartController.deleteAllProductsFromCart); //Delete all products from cart

export default router;
