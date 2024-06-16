import { jwt, log } from "../../utils/index.js";

function accessTokenValidator(req, res, next) {
  const functionName = "accessTokenValidator";
  try {
    if (!req.headers["access-token"]) {
      throw {
        message: "access-token is required!",
      };
    }
    const accessToken = req.headers["access-token"];
    const verification = jwt.verify(accessToken, process.env.SECRET_KEY);
    if (verification.id) {
      // req.user = {
      //     id: verification.id,
      //     username: verification.username,
      //     username: verification.email,
      // };
      req.userID = verification.id;
      req.username = verification.username;
      return next();
    }
    log.info(functionName, "token", "verification done");
    res.status(400).send({
      message: "Bad request!",
    });
  } catch (error) {
    log.error(functionName, "invalid token", error);
    res.status(401).send({
      message: error.message || "Unauthorised access!",
    });
  }
}

export default accessTokenValidator;
