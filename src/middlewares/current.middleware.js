import { findUser } from "../services/user.services.js";

export const authAdmin = async (req,res,next) => {
   const {email} = req.session;
   const user = await findUser(email)
   user.rol === "admin" ? next() : res.send("no tiene autorizacion para esta funcion")
}

export const authUser = async (req,res,next) => {
    const {email} = req.session;
    const user = await findUser(email)
    user.rol === "user" ? next() : res.send("no tiene autorizacion para esta funcion")
}
