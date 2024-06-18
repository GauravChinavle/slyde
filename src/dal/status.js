import { Status, StatusActions } from "./models/index.js";
import { mongoose } from "../utils/index.js";

function insertStatus(data) {
  const result = Status.create(data);
  return result;
}

function fetchStatusByID(userID) {
  const result = Status.find({ userID });
  return result;
}

function fetchStatusByIDs(ids) {
  const result = Status.find({ _id: { $in: ids } });
  return result;
}

function deleteStatus(userID, id) {
  const payload = {
    userID,
    _id: id,
  };
  const result = Status.deleteOne(payload);
  return result;
}

function insertComment(data) {
  console.log("insertComment", { data });
  const result = StatusActions.findOneAndUpdate(
    { statusID: data.statusID, userID: data.statusOwnerUserID },
    {
      $push: {
        comments: {
          id: data.userID,
          username: data.username,
          comment: data.comment,
        },
      },
    },
    { upsert: true, new: true },
  );
  return result;
}

async function insertLike(data) {
  // First, try to update the existing like
  let result = await StatusActions.findOneAndUpdate(
    {
      statusID: data.statusID,
      userID: data.statusOwnerUserID,
      "likes.userID": data.userID,
      "likes.username": data.username,
    },
    {
      $set: {
        "likes.$.like": data.like,
      },
    },
    { new: true },
  );

  // If no document was found and updated, push a new like entry
  if (!result) {
    result = await StatusActions.findOneAndUpdate(
      {
        statusID: data.statusID,
        userID: data.statusOwnerUserID,
      },
      {
        $push: {
          likes: {
            userID: data.userID,
            username: data.username,
            like: data.like,
          },
        },
      },
      { upsert: true, new: true },
    );
  }

  return result;
}

function fetchStatusCommentsByStatusID(statusID) {
  const result = StatusActions.findOne({ statusID }, { comments: 1 });
  return result;
}

function fetchStatusLikesByStatusID(statusID) {
  const result = StatusActions.findOne({ statusID }, { likes: 1 });
  return result;
}

function fetchStatusByStatusID(data, userID) {
  console.log("fetchStatusByStatusID-->", data, userID);
  const result = Status.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(data.statusID) },
    },
    {
      $lookup: {
        from: "follows",
        localField: "userID",
        foreignField: "followeeID",
        as: "follows",
      },
    },
    {
      $addFields: {
        isValidFollower: {
          $and: [
            { $in: ["$userID", "$follows.followeeID"] },
            {
              $in: [new mongoose.Types.ObjectId(userID), "$follows.followerID"],
            },
          ],
        },
      },
    },
    {
      $project: {
        _id: 1,
        userID: 1,
        follows: {
          followerID: 1,
          followeeID: 1,
        },
        isValidFollower: 1,
      },
    },
  ]);
  console.log({ result, data, userID });
  return result;
}

export {
  insertStatus,
  fetchStatusByID,
  fetchStatusByIDs,
  deleteStatus,
  insertComment,
  insertLike,
  fetchStatusCommentsByStatusID,
  fetchStatusLikesByStatusID,
  fetchStatusByStatusID,
};
