import { userDao } from "../persistence/DAOs/factory.js"

 const create =  async (user) => {
    const userC = await userDao.create(user);
    return userC
}

 const getByEmail = async(email) => {
    const user = await userDao.getByEmail(email);
    return user;
}

 const logIn = async(user) => {
   const userL = await userDao.LogIn(user);
   return userL;
}

 const getById = async(id) => {
    const user = await userDao.getById(id);
    return user;
}

 const updatePassword = async(id, password) => {
    await userDao.updatePassword(id, password);
}

export default {create, getByEmail, logIn, getById, updatePassword}