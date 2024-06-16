import {
  insertStatus,
  fetchStatusByID,
  deleteStatus,
  insertComment,
  insertLike,
  fetchStatusCommentsByStatusID,
  fetchStatusLikesByStatusID,
  fetchStatusByStatusID,
} from "../dal/status.js";
import { fetchFolloweesByFollowerID } from "../dal/follow.js";
import { uploadToS3 } from "../utils/index.js";

async function mediaStatus(fileContent, userID) {
  const payload = {
    userID,
    content: null,
    contentURL: null,
  };
  payload.contentType = fileContent?.mimetype;
  payload.contentURL = await uploadToS3(fileContent, userID);
  return payload;
}

async function createStatus(fileContent, data, userID) {
  let dbPayload = {
    userID,
    content: data.content,
    contentType: "text",
    contentURL: null,
  };
  if (fileContent?.buffer) {
    dbPayload = await mediaStatus(fileContent, userID);
  }
  const result = await insertStatus(dbPayload);
  return result;
}

async function getStatusID(userID) {
  const result = await fetchStatusByID(userID);
  return result;
}

async function getFolloweesStatusByID(id) {
  const followees = await fetchFolloweesByFollowerID(id);
  if (followees.length) {
    const followeesIDs = followees.map((f) => f.followeeID);
    const result = await fetchStatusByID(followeesIDs);
    if (result.length) {
      return result;
    }
    throw {
      statusCode: 400,
      message: "Followees of the given user haven't uploaded any status yet!",
    };
  }
  throw {
    statusCode: 400,
    message: "Given user does not follow anyone yet!",
  };
}

async function createComment(userID, username, data) {
  const statusOwner = await fetchStatusByStatusID(data, userID);
  if (!statusOwner?.length) {
    throw {
      statusCode: 400,
      message: "Not a valid status",
    };
  }
  if (
    statusOwner[0].isValidFollower ||
    statusOwner[0]?.userID.valueOf() === userID
  ) {
    const result = await insertComment({
      statusOwnerUserID: statusOwner[0]?.userID,
      userID,
      username,
      ...data,
    });
    return result;
  }
  throw {
    statusCode: 400,
    message: "Not a valid follower",
  };
}

async function createLike(userID, username, data) {
  const statusOwner = await fetchStatusByStatusID(data, userID);
  if (!statusOwner?.length) {
    throw {
      statusCode: 400,
      message: "Not a valid status",
    };
  }
  if (
    statusOwner[0].isValidFollower ||
    statusOwner[0]?.userID.valueOf() === userID
  ) {
    console.log({
      statusOwnerUserID: statusOwner[0]?.userID,
      userID,
      username,
      ...data,
    });
    const result = await insertLike({
      statusOwnerUserID: statusOwner[0]?.userID,
      userID,
      username,
      ...data,
    });
    return result;
  }
  throw {
    statusCode: 400,
    message: "Not a valid follower",
  };
}

async function getStatusCommentsByStatusID(statusID) {
  const result = await fetchStatusCommentsByStatusID(statusID);
  if (result?.comments?.length) {
    return {
      comments: result.comments,
      totalCount: result.comments.length,
    };
  }
  throw {
    statusCode: 400,
    message: "There is no comment so far for the given status id",
  };
}

async function getStatusLikesByStatusID(statusID) {
  const result = await fetchStatusLikesByStatusID(statusID);
  if (result?.likes?.length) {
    return {
      likes: result.likes,
      totalCount: result.likes.length,
    };
  }
  throw {
    statusCode: 400,
    message: "There is no likes so far for the given status id",
  };
}

async function removeStatus(userID, statusID) {
  const result = await deleteStatus(userID, statusID);
  if (result?.deletedCount) {
    return result;
  }
  throw {
    statusCode: 400,
    message: "Status cannot be deleted",
  };
}

export {
  createStatus,
  getStatusID,
  getFolloweesStatusByID,
  removeStatus,
  createComment,
  createLike,
  getStatusCommentsByStatusID,
  getStatusLikesByStatusID,
};
