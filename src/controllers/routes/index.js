import { app, express, httpContext } from "../../utils/index.js";
import {
  logger,
  validator,
  accessTokenValidator,
} from "../middlewares/index.js";
import userRouter from "./users.js";
import followRoute from "./follow.js";
import statusRouter from "./status.js";

app.use(express.json());

app.use(httpContext.middleware);

app.use("/healthCheck", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/users", logger, validator, userRouter);

app.use("/api/follow", logger, accessTokenValidator, validator, followRoute);

app.use("/api/status", logger, accessTokenValidator, validator, statusRouter);

app.use("/", logger, (req, res) => {
  res.status(404).send({
    message: "Invalid API",
  });
});

export default app;
