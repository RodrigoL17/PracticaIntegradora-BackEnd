import { Router } from "express";
import UserManager from "../dao/mongoManagers/usersManager.js";

const router = Router()
const userManager = new UserManager()

router.get("/", (req, res) => {
    res.render("login");
  });

router.get("/api/session/registration", (req,res)=>{
  res.render("registration")
})

router.get("/api/sesion/profile",(req,res)=>{
  res.render("profile")
})

router.post("/api/session/registration", async(req,res)=>{
    const newUser = await userManager.createUser(req.body)
    if(newUser){
      res.redirect("/")
    }else{
      res.send("error registro")
    }
})

router.post("/",async (req,res) =>{
    const {email, password} = req.body
    const user = await userManager.userLogIn(req.body)
    if(user){
      req.session.email = email
      req.session.password = password
      res.redirect("/views/products")
    }else{
      res.redirect("/api/session/errorLogin")
    }
})

router.get("/api/session/logout", (req,res)=>{
  req.session.destroy(error=>{
    if(error){
      console.log(error)
      res.json({message: error})
    }
  })
  // console.log("sesion destruida")
  res.redirect("/")
})

export default router