import winston from "winston";
import config from "../config.js";

const myLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
};

const logger = winston.createLogger({
  levels: myLevels.levels,
  transport: [],
});

if (config.ENVIROMENT === "development") {
  logger.add(
    new winston.transports.Console({
      level: "debug",
      format: winston.format.simple(),
    })
  );
}

if (config.ENVIROMENT === "production") {
  logger.add(
    new winston.transports.File({
      level: "error",
      filename: "errors.log",
      format: winston.format.json(),
    })
  );
  logger.add(
    new winston.transports.Console({
      level: "info",
      format: winston.format.simple(),
    })
  );
}

export default logger;
