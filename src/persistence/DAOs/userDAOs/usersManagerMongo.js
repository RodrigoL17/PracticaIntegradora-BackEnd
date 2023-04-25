import { userModel } from "../../Mongo/models/users.model.js";
import { hashPassword, comparePassword } from "../../../utils.js";
import UserRespDTO from "../../DTOs/userResp.DTO.js";

export default class UserManager {
  async createUser(user) {
    const { email, password } = user;
    try {
      const existsUser = await userModel.find({ email });
      if (existsUser.length === 0) {
        const hashNewPassword = await hashPassword(password);
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          const adminUser = {
            ...user,
            password: hashNewPassword,
            rol: "admin",
          };
          const userCreated = await userModel.create(adminUser);
          return userCreated;
        } else {
          const newUser = { ...user, password: hashNewPassword };
          const userCreated = await userModel.create(newUser);
          return userCreated;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async userLogIn(user) {
    const { email, password } = user;
    const existsUser = await userModel.findOne({ email });
    if (existsUser) {
      const isPassword = await comparePassword(password, existsUser.password);
      if (isPassword) {
        return existsUser;
      }
      return null;
    }
  }

  async findUser(email) {
    
    const user = await userModel.findOne({ email });
    const userDTO = new UserRespDTO(user);
    return userDTO;
    console.log("lala",userDTO)
  }
}
