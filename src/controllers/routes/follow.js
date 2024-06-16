import { express, log } from "../../utils/index.js";

import {
  createFollow,
  getNonFollowers,
  removeFollow,
  getFollowers,
  getFollowings,
} from "../../services/index.js";
const followRouter = express.Router();

followRouter
  .post("/", async (req, res) => {
    const functionName = "followRouter POST /";
    try {
      const response = await createFollow(req.userID, req.body);
      log.info(functionName, "response from createFollow", response);
      return res.status(200).send({
        message: "User followed!",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while creating user!",
      });
    }
  })
  .get("/followers", async (req, res) => {
    const functionName = "followRouter GET /";
    try {
      const response = await getFollowers(req.userID);
      log.info(functionName, "response from getUsersExceptByID", response);
      return res.status(200).send({
        message: "List of followers",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while fetching user!",
      });
    }
  })
  .get("/following", async (req, res) => {
    const functionName = "followRouter GET /";
    try {
      const response = await getFollowings(req.userID);
      log.info(functionName, "response from getUsersExceptByID", response);
      return res.status(200).send({
        message: "List of following",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while fetching user!",
      });
    }
  })
  .get("/non-followers", async (req, res) => {
    const functionName = "followRouter GET /";
    try {
      const response = await getNonFollowers(req.userID);
      log.info(functionName, "response from getUsersExceptByID", response);
      return res.status(200).send({
        message: "List of non followers",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while fetching user!",
      });
    }
  })
  .delete("/", async (req, res) => {
    const functionName = "followRouter DELETE /";
    try {
      const response = await removeFollow(req.userID, req.body);
      log.info(functionName, "response from removeFollow", response);
      return res.status(200).send({
        message: "User unfollowed!",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while unfollowing user!",
      });
    }
  });

export default followRouter;
