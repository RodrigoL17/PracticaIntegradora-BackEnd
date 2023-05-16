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
import {
  createCartService,
  findCartByUserIdService,
} from "../services/cart.services.js";
import { transporter } from "../nodemailer.js";
import { findUser, findUserById, findUserByIdAndUpdatePassword } from "../services/user.services.js";
import { hashPassword, comparePassword } from "../utils.js";


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

router.get(
  "/githubCallback",
  passport.authenticate("github"),
  async (req, res) => {
    try {
      const userId = req.user._id;
      const haveCart = await findCartByUserIdService(userId);
      !haveCart && (await createCartService(userId));
    } catch (error) {
      console.log(error);
    }
    req.session.email = req.user.email;
    res.redirect("/views/products");
  }
);

//login con github
router.get(
  "/githubLogin",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.post("/", login);

router.get("/api/session/reestablecer", (req, res) => {
  res.render("reestablecer");
});

router.post("/api/session/reestablecerRedirect", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUser(email);
    if (!user) {
      res.send("el usuario ingresado no existe");
    } else {
      const id = user._id.toString();
      await transporter.sendMail({
        from: "ECOMMERCE",
        to: email,
        subject: "Reestablecer contraseña",
        html: `<p>Para reestablecer la contraseña dirigete al siguiente link: </p>
      <a href="http://localhost:3000/api/session/reestablecerContrasena/${id}">Haz click aqui</a>`,
      });
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/session/reestablecerContrasena/:uid", (req, res) => {
  const { uid } = req.params;
  res.render("reestablecerContraseña", { uid: uid });
});

router.post("/api/session/reestablecerContrasena/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const { password } = req.body;
    const user = await findUserById(uid);
    const isPassword = await comparePassword(password, user.password)
    if (isPassword) {
      res.send("No se puede colocar la misma contraseña")
    }else{
      const newPassword = await hashPassword(password)
      await findUserByIdAndUpdatePassword(uid, newPassword)
      res.send("Contraseña modificada con exito")
    }
    
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/session/logout", logout);

export default router;
