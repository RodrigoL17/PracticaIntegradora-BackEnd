import userService from "../services/user.services.js";
import cartService from "../services/cart.services.js";
import { generateToken, comparePassword, hashPassword } from "../utils.js";
import { transporter } from "../Utilities/NodeMailer/nodemailer.js";

const registration = async (req, res) => {
  try {
    const user = req.body;
    const { email, password } = user;
    const [, domain] = email.split("@");
    const existsUser = await userService.getByEmail(email);
    if (existsUser) {
      res.send("User already exists");
    }
    const hashNewPassword = await hashPassword(password);
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      const newUser = {
        ...user,
        password: hashNewPassword,
        isUser: false,
        isAdmin: true,
      };
      const userCreated = await userService.create(newUser);
      await cartService.create(userCreated._id);
      userCreated ? res.redirect("/") : res.send("error registro");
    }
    if (domain === "premium.com") {
      const newUser = {
        ...user,
        password: hashNewPassword,
        isUser: false,
        isPremium: true,
      };
      const userCreated = await userService.create(newUser);
      await cartService.create(userCreated._id);
      userCreated ? res.redirect("/") : res.send("error registro");
    }
    const newUser = { ...user, password: hashNewPassword };
    const userCreated = await userService.create(newUser);
    await cartService.create(userCreated._id);
    userCreated ? res.redirect("/") : res.send("error registro");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const { email, password } = user;
    const existsUser = await userService.getByEmail(email);
    if (!existsUser) res.redirect("/errorLogin");
    const isPassword = await comparePassword(password, existsUser.password);
    if (!isPassword) res.redirect("/errorLogin");
    const token = generateToken(existsUser);
    res.cookie("token", token, { httpOnly: true }).redirect("/products");
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
      const redirectUrl = `/changePassword/${uid}/${token}?isWrong=${isWrong}`;
      res.status(200).json({ redirectUrl });
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

const changePremiumStatus = async (req, res) => {
  const { uid } = req.params;
  const user = await userService.getById(uid);
  let { isUser, isPremium } = user;
  if (isUser) {
    isUser = false;
    isPremium = true;
  } else {
    isUser = true;
    isPremium = false;
  }
  const newUser = await userService.updateStatus(uid, isUser, isPremium);
  const token = generateToken(newUser);
  res.clearCookie("token").cookie("token", token).redirect("/products")
};

export default {
  login,
  logout,
  registration,
  githubCallback,
  emailResetPassword,
  changePassword,
  changePremiumStatus,
};
