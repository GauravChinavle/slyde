import { log, httpContext, uuid } from "../../utils/index.js";

function logger(req, res, next) {
  const functionName = "request-logger";
  httpContext.set("APIName", req.baseUrl);
  httpContext.set("APIHash", uuid());
  log.info(functionName, "apiName:", req.baseUrl);
  log.info(functionName, "originalUrl:", req.originalUrl);
  log.info(functionName, "request:", {
    body: req.body,
    params: req.params,
    query: req.query,
  });
  next();
}

export default logger;
