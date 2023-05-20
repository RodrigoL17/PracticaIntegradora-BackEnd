import { Router } from "express";
import viewsController from "../controllers/views.controllers.js";
import sessionController from "../controllers/session.controller.js";
import passport from "passport";

const router = Router();

router.get("/", viewsController.renderLogin); // Render login
router.get("/signUp", viewsController.renderRegistration); //Render registration
router.get("/profile", viewsController.renderProfile);
router.get("/errorlogin", viewsController.renderErrorLogin); //
router.get("/reestablish", viewsController.renderReestablish); // Render reestablish password
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

router.get(
  "/githubCallback",
  passport.authenticate("github"),
  sessionController.githubCallback
);

export default router;
