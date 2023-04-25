import { userDao } from "../persistence/DAOs/factory.js"

export const createUser =  async (user) => {
    const userC = await userDao.createUser(user);
    return userC
}

export const findUser = async(email) => {
    const user = await userDao.findUser(email);
    return user;
}

export const userLogIn = async(user) => {
   const userL = await userDao.userLogIn(user);
   return userL;
}
