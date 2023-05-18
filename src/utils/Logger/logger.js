import winston from "winston";
import config from "../Dotenv/config.js";

const myLevels = {
  //Logger levels
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
  //Logger instance
  levels: myLevels.levels,
  transport: [],
});

if (config.ENVIROMENT === "development") {
  // In development mode all levels are enabled and only display in consele
  logger.add(
    new winston.transports.Console({
      level: "debug",
      format: winston.format.simple(),
    })
  );
}

if (config.ENVIROMENT === "production") {
  // In production mode, errors are logged to a file (errors.log) at the error level, while info level logs are displayed in the console
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
