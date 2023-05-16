import { userModel } from "../../Mongo/models/users.model.js";
import { hashPassword, comparePassword } from "../../../utils.js";
import UserRespDTO from "../../DTOs/userResp.DTO.js";

export default class UserManager {
  async createUser(user) {
    const { email, password } = user;
    try {
      const existsUser = await userModel.findOne({ email });
      if (existsUser) {
        return null;
      }
      const hashNewPassword = await hashPassword(password);
      const newUser = {
        ...user,
        password: hashNewPassword,
        rol:
          email === "adminCoder@coder.com" && password === "adminCod3r123"
            ? "admin"
            : "user",
      };
      const userCreated = await userModel.create(newUser);
      return userCreated;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async userLogIn(user) {
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

  async findUser(email) {
    const user = await userModel.findOne({ email });
    return user;
  }

  async findUserById(id) {
    const user = await userModel.findById(id);
    return user;
  }

  async findUserByIdAndUpdatePassword(id, password){
    await userModel.findByIdAndUpdate(id, {password: password});
  }
}
