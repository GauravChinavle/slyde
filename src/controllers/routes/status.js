import { express, log } from "../../utils/index.js";
import {
  createStatus,
  createComment,
  removeStatus,
  getStatusID,
  getFolloweesStatusByID,
  createLike,
  getStatusCommentsByStatusID,
  getStatusLikesByStatusID,
} from "../../services/index.js";
import { fileUpload } from "../middlewares/index.js";

const statusRouter = express.Router();

statusRouter
  .post("/", fileUpload, async (req, res) => {
    const functionName = "statusRouter POST /";
    try {
      const response = await createStatus(req.file, req.body, req.userID);
      log.info(functionName, "response from createStatus", response);
      return res.status(200).send({
        message: "Status uploaded!",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while creating user!",
      });
    }
  })
  .get("/", async (req, res) => {
    const functionName = "statusRouter GET /";
    try {
      const response = await getStatusID(req.userID);
      log.info(functionName, "response from getStatusID", response);
      return res.status(200).send({
        message: "List of statuses of the given user",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while fetching user!",
      });
    }
  })
  .post("/comment", async (req, res) => {
    const functionName = "statusRouter POST /comment";
    try {
      const response = await createComment(req.userID, req.username, req.body);
      log.info(functionName, "response from createComment", response);
      return res.status(200).send({
        message: "User commented!",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while creating user!",
      });
    }
  })
  .post("/like", async (req, res) => {
    const functionName = "statusRouter POST /like";
    try {
      const response = await createLike(req.userID, req.username, req.body);
      log.info(functionName, "response from createLike", response);
      return res.status(200).send({
        message: "User liked!",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while creating user!",
      });
    }
  })
  .get("/:status_id/comments", async (req, res) => {
    const functionName = "statusRouter GET /:status_id/comments";
    try {
      const response = await getStatusCommentsByStatusID(req.params.status_id);
      log.info(
        functionName,
        "response from getStatusCommentsByStatusID",
        response,
      );
      return res.status(200).send({
        message: "Comments for the given status id",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while fetching user!",
      });
    }
  })
  .get("/:status_id/likes", async (req, res) => {
    const functionName = "statusRouter GET /:status_id/likes";
    try {
      const response = await getStatusLikesByStatusID(req.params.status_id);
      log.info(
        functionName,
        "response from getStatusLikesByStatusID",
        response,
      );
      return res.status(200).send({
        message: "Likes for the given status id",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while fetching user!",
      });
    }
  })
  .get("/view", async (req, res) => {
    const functionName = "statusRouter GET /view";
    try {
      const response = await getFolloweesStatusByID(req.userID);
      log.info(functionName, "response from getStatusByID", response);
      return res.status(200).send({
        message:
          "List of statuses of the users which are followed by the given user",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while fetching user!",
      });
    }
  })
  .delete("/:status_id", async (req, res) => {
    const functionName = "statusRouter DELETE /:status_id";
    try {
      const response = await removeStatus(req.userID, req.params.status_id);
      log.info(functionName, "response from removeFollow", response);
      return res.status(200).send({
        message: "Status deleted!",
        data: response,
      });
    } catch (error) {
      log.error(functionName, "in catch", error);
      return res.status(error.statusCode || 500).send({
        message: error.message || "Error occured while unfollowing user!",
      });
    }
  });

export default statusRouter;
