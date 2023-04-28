import { Router } from "express";
// import { authUser } from "../middlewares/current.middleware.js";

const router = Router();

router.get("/",(req, res) => {
  res.render("chat");
});

export default router;
