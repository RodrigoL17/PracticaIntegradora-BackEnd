import { Router } from "express";
import {
  getAllProductsViews,
  getCart,
  renderRealTimeProdcuts,
  getProuctsEmailAssociated,
} from "../controllers/views.controllers.js";

const router = Router();

//RealtimeProducts
router.get("/realtimeproducts", renderRealTimeProdcuts);

//Home
router.get("/home", getAllProductsViews);

//Products
router.get("/products", getProuctsEmailAssociated);

//Cart
router.get("/carts/:cid", getCart);

export default router;
