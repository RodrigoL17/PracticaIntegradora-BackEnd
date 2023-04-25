import { Router } from "express";
import { createTicketController } from "../controllers/ticket.controller.js";


const router = Router();

router.get("/:cid" , createTicketController);

export default router;
