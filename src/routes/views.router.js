import { Router } from "express";
import viewsController from "../controllers/views.controllers.js";
import sessionController from "../controllers/session.controller.js";
import UserCartDTO from "../persistence/DTOs/userCart.DTO.js";
import passport from "passport";

const router = Router();

router.get("/", viewsController.renderLogin); // Render login
router.get("/signUp", viewsController.renderRegistration); //Render registration
router.get("/profile", viewsController.renderProfile);
router.get("/errorlogin", viewsController.renderErrorLogin); // Render error login
router.get("/resetPassword", viewsController.renderResetPassword); // Render reset password
router.get("/carts/:cid", viewsController.renderCart); // Render Cart
router.get("/products/Github", viewsController.renderProductsEmailAssociated); //Render Products for Github User
router.get("/changePassword/:uid/:token", viewsController.renderChangePassword); //Render change password
router.get("/products/details/:pid/:uid", viewsController.renderCardProduct); // Render Card Product Details
router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  viewsController.renderProductsEmailAssociated
);

router.get("/createProduct/:uid", (req, res) => {
  const { uid } = req.params;
  res.render("createProduct");
});

router.get(
  "/githubCallback",
  passport.authenticate("github"),
  sessionController.githubCallback
);

export default router;
