import { Router } from "express";
import logger from "../Utilities/Logger/logger.js";

const router = Router();
// Test of loggers
router.get("/", (req, res) => {
  logger.fatal("fatal");
  logger.error("error");
  logger.warning("warning");
  logger.info("info");
  logger.http("http");
  logger.debug("debug");
  res.send("test");
});

export default router;
