import { createLogger, format, transports } from "winston";
import { httpContext } from "../requireHelper.js";

const customFormat = format.printf(
  ({ level, message, functionName, action, timestamp }) => {
    const apiName = httpContext.get("APIName");
    const apiHash = httpContext.get("APIHash");
    return JSON.stringify({
      timestamp,
      apiName,
      functionName,
      action,
      message,
      apiHash,
      level,
    });
  },
);

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    customFormat,
  ),
  transports: [new transports.Console()],
});

logger.info = function (functionName, action, message, level = "info") {
  this.log({ level, functionName, action, message });
};

logger.error = function (functionName, action, message, level = "error") {
  this.log({ level, functionName, action, message });
};

export default logger;
