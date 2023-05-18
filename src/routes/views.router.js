import { Router } from "express";
import {
  getCart,
  getProuctsEmailAssociated,
} from "../controllers/views.controllers.js";
import passport from "passport";

const router = Router();


router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  getProuctsEmailAssociated
);

router.get(
  "/products/Github",
  getProuctsEmailAssociated
);

router.get("/createProduct/:uid", (req,res) => {
  const {uid} = req.params
  res.render("createProduct", {uid: uid})
})

//Cart
// router.get("/carts/:cid", getCart);

export default router;
