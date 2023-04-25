import { Router } from "express";
import {
  login,
  logout,
  registration,
  renderErrorLogin,
  renderLogin,
  renderProfile,
  renderRegistration,
} from "../controllers/session.controller.js";
import passport from "passport";

const router = Router();

router.get("/", renderLogin);

router.get("/api/session/registration", renderRegistration);

router.get("/api/sesion/profile", renderProfile);

router.get("/api/session/errorlogin", renderErrorLogin);

router.post("/api/session/registration", registration);

//registro via github
router.get(
  "/api/session/GitHubregistration",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get("/github", passport.authenticate("github"), (req, res) => {
  req.session.email = req.user.email;
  res.redirect("/views/products");
});

router.post("/", login);

//login con github
router.get(
  "/githubLogin",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/api/session/logout", logout);

export default router;
