import { Router } from "express";
import passport from "passport";
import UserManager from "../dao/mongoManagers/usersManager.js";

const router = Router();
const userManager = new UserManager();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/api/session/registration", (req, res) => {
  res.render("registration");
});

router.get("/api/sesion/profile", (req, res) => {
  res.render("profile");
});

router.get("/api/session/errorlogin", (req, res) => {
  res.render("errorLogin");
});

router.post("/api/session/registration", async (req, res) => {
  const newUser = await userManager.createUser(req.body);
  if (newUser) {
    res.redirect("/");
  } else {
    res.send("error registro");
  }
});

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

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await userManager.userLogIn(req.body);
  if (user) {
    req.session.email = email;
    req.session.password = password;
    res.redirect("/views/products");
  } else {
    res.redirect("/api/session/errorLogin");
  }
});

//login con github
router.get(
  "/githubLogin",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/api/session/logout", (req, res) => {
  req.session.destroy(error=>{
    if(error){
      console.log(error)
      res.json({message: error})
    }
  })
  res.redirect("/")
});
export default router;
