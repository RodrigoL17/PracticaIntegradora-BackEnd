import { userModel } from "../../Mongo/models/users.model.js";
import { hashPassword, comparePassword } from "../../../utils.js";
import UserRespDTO from "../../DTOs/userResp.DTO.js";

export default class UserManager {
  async create(user) {
    try {
      const { email, password } = user;
      const [,domain ] = email.split("@");
      const existsUser = await userModel.findOne({ email });
      if (existsUser) {
        return null;
      }
      const hashNewPassword = await hashPassword(password);
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        const newUser = {
          ...user,
          password: hashNewPassword,
          isUser: false,
          isAdmin: true,
        };
        const userCreated = await userModel.create(newUser);
        return userCreated;
      }
      if (domain === "premium.com"){
        const newUser = {
          ...user,
          password: hashNewPassword,
          isUser: false,
          isPremium: true,
        };
        const userCreated = await userModel.create(newUser);
        return userCreated;
      }
      const newUser = {...user, password: hashNewPassword}
      const userCreated = await userModel.create(newUser)
      return userCreated
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async logIn(user) {
    const { email, password } = user;
    const existsUser = await userModel.findOne({ email });
    if (!existsUser) {
      return null;
    }
    const isPassword = await comparePassword(password, existsUser.password);
    if (!isPassword) {
      return null;
    }
    return existsUser;
  }

  async getByEmail(email) {
    const user = await userModel.findOne({ email });
    return user;
  }

  async getById(id) {
    const user = await userModel.findById(id);
    return user;
  }

  async updatePassword(id, password) {
    await userModel.findByIdAndUpdate(id, { password: password });
  }
}
