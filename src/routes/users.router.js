import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router =  Router();


router.get("/", userController.getAll) // get all users
router.delete("/", userController.deleteMoreThanTwoDaysLogin) // delete all users who has more than 2 days without login
router.delete("/:cid", userController.deleteById) // delete user by id
export default router