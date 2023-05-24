import { Router } from "express";
import sessionController from "../controllers/session.controller.js";
import passport from "passport";

const router = Router();

router.get("/logout", sessionController.logout);

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
router.post("/signUp", sessionController.registration);
router.post("/emailResetPassword", sessionController.emailResetPassword);
router.post("/changePassword/:uid", sessionController.changePassword);

export default router;
