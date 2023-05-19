import jwt from "jsonwebtoken"
import config from "../config.js";


export const jwtValidation = (req,res,next) => {
    const token = req.cookies.token
    const verifiedUser = jwt.verify(token, config.JWT_SECRET)
    if (verifiedUser) {
        req.user = verifiedUser.user;
        next();
    }else {
        res.json({message: "Autenticacion fallida"})
    }
}