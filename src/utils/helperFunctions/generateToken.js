import { jwt } from "../requireHelper.js";
import log from "./winstonLogger.js";
import { accessTokenValidity } from "../../config/constants.js";

function generateToken(data) {
  const functionName = "generateToken";
  try {
    const token = jwt.sign(
      {
        id: data.id,
        email: data.email,
        username: data.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: accessTokenValidity },
    );
    log.info(functionName, "token", "token generated");
    return token;
  } catch (error) {
    log.error(functionName, "error while generating token", error);
  }
}

export default generateToken;
