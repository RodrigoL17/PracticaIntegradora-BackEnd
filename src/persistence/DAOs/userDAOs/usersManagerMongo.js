import { userModel } from "../../Mongo/models/users.model.js";
import UserRespDTO from "../../DTOs/userCart.DTO.js";

export default class UserManager {
  async create(user) {
   const newUser = await userModel.create(user);
   return newUser
  }


  async getByEmail(email) {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(id, password) {
    try {
      await userModel.findByIdAndUpdate(id, { password: password });
    } catch (error) {
      console.log(error);
    }
  }
}
