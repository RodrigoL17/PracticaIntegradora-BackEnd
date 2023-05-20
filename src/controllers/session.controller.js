import userService from "../services/user.services.js";
import cartService from "../services/cart.services.js";
import { generateToken, comparePassword, hashPassword } from "../utils.js";
import { transporter } from "../Utilities/NodeMailer/nodemailer.js";


const registration = async (req, res) => {
  const newUser = await userService.create(req.body);
  await cartService.create(newUser._id);
  if (newUser) {
    res.redirect("/");
  } else {
    res.send("error registro");
  }
};

const login = async (req, res) => {
  try {
    const user = await userService.logIn(req.body);
    if (user) {
      const token = generateToken(user);

      res
        .cookie("token", token, { httpOnly: true })
        .redirect("/views/products");
    } else {
      res.redirect("/api/session/errorLogin");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const githubCallback = async (req, res) => {
  try {
    const userId = req.user._id;
    const haveCart = await cartServices.getByUserId(userId);
    !haveCart && (await cartServices.create(userId));
  } catch (error) {
    console.log(error);
  }
  res.redirect("/views/products/Github");
};

const reestablecerContrasena = (req, res) => {
  const { uid, token } = req.params;
  const prevToken = req.cookies.token;
  if (token === prevToken) {
    res.render("reestablecerContraseña", { uid: uid });
  } else {
    res.render("redireccionRC");
  }
};

const reestablecerRedirect = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.getByEmail(email);
    if (!user) {
      res.send("el usuario ingresado no existe");
    } else {
      const token = generateToken(user);
      const id = user._id.toString();
      await transporter.sendMail({
        from: "ECOMMERCE",
        to: email,
        subject: "Reestablecer contraseña",
        html: `<p>Para reestablecer la contraseña dirigete al siguiente link: </p>
      <a href="http://localhost:3000/api/session/reestablecerContrasena/${id}/${token}">Haz click aqui</a>`,
      });
      res.cookie("token", token).redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  //falta separar controlador
  try {
    const { uid } = req.params;
    const { password } = req.body;
    const user = await userService.getById(uid);
    const isPassword = await comparePassword(password, user.password);
    if (isPassword) {
      res.send("No se puede colocar la misma contraseña");
    } else {
      const newPassword = await hashPassword(password);
      await userService.updatePassword(uid, newPassword);
      res.send("Contraseña modificada con exito");
    }
  } catch (error) {
    console.log(error);
  }
}

export default {
  login,
  logout,
  registration,
  githubCallback,
  reestablecerContrasena,
  reestablecerRedirect,
  changePassword
};
