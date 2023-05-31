import { Router } from "express";
import prodController from "../controllers/products.controller.js";
import {
  authAdmin,
  authPremium,
} from "../Utilities/Middlewares/current.middleware.js";

const router = Router();

router.get("/", prodController.getAll);
router.get("/:pid", prodController.getById);
router.post("/", authPremium, authAdmin, prodController.create);
router.put("/:pid", prodController.update);
router.delete(
  "/:pid",
  authPremium,
  (req, res, next) => {
    if (req.user?.isPremium) {
      // If user is Premium goes directly to controller
      return prodController.remove(req, res, next);
    }
    // If user is notPremium go through authAdmin and then to controller
    authAdmin(req, res, next);
  },
  prodController.remove
);

export default router;
