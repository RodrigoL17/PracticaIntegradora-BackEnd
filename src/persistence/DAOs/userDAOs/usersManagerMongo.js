import { userModel } from "../../Mongo/models/users.model.js";

export default class UserManager {
  async create(user) {
    const newUser = await userModel.create(user);
    return newUser;
  }

  async getAll() {
    const users = await userModel.find({});
    return users;
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

  async updateStatus(id, isUser, isPremium) {
    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { isUser: isUser, isPremium: isPremium },
        { new: true }
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async updateLastLogin(id, date) {
    try {
      const user = await userModel.findByIdAndUpdate(id, { last_login: date });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const user = await userModel.findByIdAndDelete(id, { new: true });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteByLastLogin(twoDaysAgo) {
    try {
      const deltedUsers = await userModel.deleteMany({ last_login: { $lt: twoDaysAgo } })
      return deltedUsers
    } catch (error) {
      console.log(error);
    }
  }
}
