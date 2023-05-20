import { Router } from "express";
import sessionController from "../controllers/session.controller.js";
import passport from "passport";

const router = Router();

router.get("/logout", sessionController.logout);
router.get(
  "/reestablecerContrasena/:uid/:token",
  sessionController.reestablecerContrasena
);
//registro via github
router.get(
  "/GitHubregistration",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

//login con github
router.get(
  "/githubLogin",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.post("/login", sessionController.login);
router.post("/registration", sessionController.registration);
router.post(
  "/reestablecerRedirect",
  sessionController.reestablecerRedirect
);
router.post(
  "/changePassword/:uid",
  sessionController.changePassword
);

export default router;
