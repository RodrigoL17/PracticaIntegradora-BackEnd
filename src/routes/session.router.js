import { Router } from "express";
import sessionController from "../controllers/session.controller.js";
import passport from "passport";

const router = Router();

router.get("/api/session/logout", sessionController.logout);

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
router.get(
  "/githubCallback",
  passport.authenticate("github"),
  sessionController.githubCallback
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
  "/reestablecerContrasena/:uid",
  sessionController.changePassword
);

export default router;
