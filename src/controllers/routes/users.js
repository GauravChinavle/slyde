import { express, log } from "../../utils/index.js";
import {
  createUser,
  getUserByID,
  removeUserByID,
  findAndUpdateUserByID,
  loginUser,
} from "../../services/index.js";
import { accessTokenValidator } from "../middlewares/index.js";
const userRouter = express.Router();

userRouter
  .post("/", async (req, res) => {
    const functionName = "userRouter POST / ";
    try {
      const response = await createUser(req.body);
      log.info(functionName, "response from createUser", response);
      return res.status(200).send({
        message: "User created!",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(400).send({
        message: "Error occured while creating user!",
      });
    }
  })
  .get("/", accessTokenValidator, async (req, res) => {
    const functionName = "userRouter GET /";
    try {
      const response = await getUserByID(req.userID);
      log.info(functionName, "response from getUserByID", response);
      return res.status(200).send({
        message: "Details of user",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while fetching user!",
      });
    }
  })
  .put("/", accessTokenValidator, async (req, res) => {
    const functionName = "userRouter PUT /";
    try {
      const response = await findAndUpdateUserByID(req.userID, req.body);
      log.info(functionName, "response from findAndUpdateUserByID", response);
      return res.status(200).send({
        message: "User updated!",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(400).send({
        message: "Error occured while updating user!",
      });
    }
  })
  .delete("/", async (req, res) => {
    const functionName = "userRouter DELETE /:id";
    try {
      const response = await removeUserByID(req.userID);
      log.info(functionName, "response from removeUserByID", response);
      return res.status(200).send({
        message: "User deleted!",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(400).send({
        message: "Error occured while updating user!",
      });
    }
  })
  .post("/login", async (req, res) => {
    const functionName = "userRouter POST /login";
    try {
      console.log({ body: req.body });
      const response = await loginUser(req.body);
      log.info(functionName, "response from loginUser", response);
      return res.status(200).send({
        message: "User logged in!",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while loggin in user!",
      });
    }
  });

export default userRouter;
