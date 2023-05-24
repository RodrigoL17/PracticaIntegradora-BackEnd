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

      res.cookie("token", token, { httpOnly: true }).redirect("/products");
    } else {
      res.redirect("/errorLogin");
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
    const haveCart = await cartService.getByUserId(userId);
    !haveCart && (await cartService.create(userId));
  } catch (error) {
    console.log(error);
  }
  res.redirect("/products/Github");
};

const emailResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.getByEmail(email);
    if (!user) {
      //falta manejar esto mejor
      res.send("el usuario ingresado no existe");
    } else {
      const token = generateToken(user);
      const id = user._id.toString();
      await transporter.sendMail({
        from: "ECOMMERCE",
        to: email,
        subject: "Reestablecer contraseña",
        html: `<p>Para reestablecer la contraseña dirigete al siguiente link: </p>
      <a href="http://localhost:3000/changePassword/${id}/${token}">Haz click aqui</a>`,
      });
      res.cookie("token", token).redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { uid } = req.params;
    const { password, token } = req.body;
    console.log("uid", uid);
    console.log("password", password);
    console.log("token", token);
    const user = await userService.getById(uid);
    const isPassword = await comparePassword(password, user.password);
    console.log("isPassword", isPassword);
    if (isPassword) {
      const isWrong = true;
      const redirectUrl = `/changePassword/${uid}/${token}?isWrong=${isWrong}`
      res.status(200).json({redirectUrl})
    } else {
      const newPassword = await hashPassword(password);
      await userService.updatePassword(uid, newPassword);
      const successMessage = "Contraseña modificada correctamente";
      res.status(200).json({ successMessage });
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  login,
  logout,
  registration,
  githubCallback,
  emailResetPassword,
  changePassword,
};
