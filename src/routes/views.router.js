import { Router } from "express";
import viewsController from "../controllers/views.controllers.js";
import passport from "passport";

const router = Router();

router.get("/", viewsController.renderLogin);
router.get("/registration", viewsController.renderRegistration);
router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  viewsController.getProuctsEmailAssociated
);

router.get("/products/Github", viewsController.getProuctsEmailAssociated);

router.get("/createProduct/:uid", (req, res) => {
  const { uid } = req.params;
  res.render("createProduct", { uid: uid });
});

// Cart
router.get("/carts/:cid", viewsController.getCart);

export default router;
