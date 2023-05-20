import { Router } from "express";
import sessionController from "../controllers/session.controller.js";
import passport from "passport";

const router = Router();



router.get("/api/sesion/profile", sessionController.renderProfile);
router.get("/api/session/errorlogin", sessionController.renderErrorLogin);
router.get("/api/session/logout", sessionController.logout);
router.get("/api/session/reestablecer", sessionController.renderReestablecer);
router.get(
  "/api/session/reestablecerContrasena/:uid/:token",
  sessionController.reestablecerContrasena
);
//registro via github
router.get(
  "/api/session/GitHubregistration",
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
router.post("/api/session/registration", sessionController.registration);
router.post(
  "/api/session/reestablecerRedirect",
  sessionController.reestablecerRedirect
);
router.post(
  "/api/session/reestablecerContrasena/:uid",
  sessionController.changePassword
);

export default router;
