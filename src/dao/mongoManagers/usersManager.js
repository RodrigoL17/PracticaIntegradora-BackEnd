import { userModel } from "../models/users.model.js";

export default class UserManager {
  async createUser(user) {
    const { email, password } = user;
    try {
      const existsUser = await userModel.find({ email });
      if (existsUser.length === 0) {
        console.log("pedo", email, password)
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            console.log("1", user)
          const adminUser = { ...user, rol: "admin" };
          console.log("2", adminUser)
          const newUSer = await userModel.create(adminUser);
          return newUSer
        } else {
          const newUSer = await userModel.create(user);
          return newUSer
        }
        ;
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
    const existsUser = await userModel.find({ email, password });
    if (existsUser.length !== 0) {
      return existsUser;
    } else {
      return null;
    }
  }

  async findUser(email) {
    const user = await userModel.findOne({ email });
    return user;
  }
}
