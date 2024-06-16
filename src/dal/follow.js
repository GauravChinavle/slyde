import { User, Follow } from "./models/index.js";

function insertFollow(followerID, data) {
  const payload = {
    followerID,
    followeeID: data.followeeID,
  };
  const result = Follow.create(payload);
  return result;
}

function fetchFollow(followerID, data) {
  const payload = {
    followerID,
    followeeID: data.followeeID,
  };
  const result = Follow.findOne(payload);
  return result;
}

function fetchFolloweesByFollowerID(id) {
  const result = Follow.find(
    { followerID: { $eq: id } },
    { _id: 0, followeeID: 1 },
  );
  return result;
}

function fetchFollowersByFolloweeID(id) {
  const result = Follow.find(
    { followeeID: { $eq: id } },
    { _id: 0, followerID: 1 },
  );
  return result;
}

function fetchUserByIDs(ids) {
  const result = User.find(
    { _id: { $in: ids } },
    { id: 1, name: 1, username: 1 },
  );
  return result;
}

function fetchUserExceptByIDs(ids) {
  const result = User.find(
    { _id: { $nin: ids } },
    { id: 1, name: 1, username: 1 },
  );
  return result;
}

function deleteFollow(followerID, data) {
  const payload = {
    followerID,
    followeeID: data.followeeID,
  };
  const result = Follow.deleteOne(payload);
  return result;
}

export {
  insertFollow,
  fetchFollow,
  fetchFolloweesByFollowerID,
  fetchUserExceptByIDs,
  deleteFollow,
  fetchFollowersByFolloweeID,
  fetchUserByIDs,
};
