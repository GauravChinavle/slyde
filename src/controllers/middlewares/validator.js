import { validation } from "../../config/index.js";
import { log } from "../../utils/index.js";

function validator(req, res, next) {
  const functionName = "validator";
  const { method, originalUrl, body } = req;
  if (validation[originalUrl]?.[method]) {
    const { error } = validation[originalUrl][method].validate(body, {
      abortEarly: false,
    });
    if (error) {
      log.error(functionName, "error while validating", error);
      return res.status(400).send({
        message: error.details.map((detail) => detail.message).join(", "),
        data: {},
      });
    }
    log.info(functionName, "no validation error", body);
  } else {
    log.info(functionName, "no validations for", `${method} ${originalUrl}`);
  }
  next();
}

export default validator;
