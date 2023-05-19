import { Router } from "express";
import prodController from "../controllers/products.controller.js";
import { authAdmin } from "../Utilities/Middlewares/current.middleware.js";

const router = Router();

router.get("/",prodController.getAll);
router.get("/:pid", prodController.getById);
router.post("/", prodController.create);
router.put("/:pid", prodController.update);
router.delete("/:pid", prodController.remove);

export default router;
