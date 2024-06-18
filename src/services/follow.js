import {
  insertFollow,
  fetchFollow,
  fetchFolloweesByFollowerID,
  fetchUserExceptByIDs,
  deleteFollow,
  fetchUserByIDs,
  fetchFollowersByFolloweeID,
} from "../dal/follow.js";

async function createFollow(userID, data) {
  if (userID === data.followeeID) {
    throw {
      statusCode: 400,
      message: "User cannot follow himself",
    };
  }
  let result = await fetchFollow(userID, data);
  if (!result) {
    result = await insertFollow(userID, data);
  }
  return result;
}

async function getNonFollowers(userID) {
  const followees = await fetchFolloweesByFollowerID(userID);
  if (followees.length) {
    const ids = followees.map((f) => f.followeeID);
    const result = await fetchUserExceptByIDs([...ids, userID]);
    if (result?.length) {
      return result;
    }
    throw {
      statusCode: 400,
      message: "There are no users left who are not followed by given user",
    };
  }
  throw {
    statusCode: 400,
    message: "No non-followers found for this user",
  };
}

async function getFollowings(userID) {
  const followees = await fetchFolloweesByFollowerID(userID);
  if (followees.length) {
    const ids = followees.map((f) => f.followeeID);
    const result = await fetchUserByIDs(ids);
    if (result?.length) {
      return result;
    }
    throw {
      statusCode: 400,
      message: "There are no users left who do not follow given user",
    };
  }
  throw {
    statusCode: 400,
    message: "Given user do not follow anyone yet!",
  };
}

async function getFollowers(userID) {
  const followers = await fetchFollowersByFolloweeID(userID);
  if (followers.length) {
    const ids = followers.map((f) => f.followerID);
    const result = await fetchUserByIDs(ids);
    if (result?.length) {
      return result;
    }
    throw {
      statusCode: 400,
      message: "There are no users who are follow given user",
    };
  }
  throw {
    statusCode: 400,
    message: "No followers found for this user",
  };
}

async function removeFollow(userID, data) {
  if (userID === data.followeeID) {
    throw {
      statusCode: 400,
      message: "User cannot unfollow himself",
    };
  }
  const result = await deleteFollow(userID, data);
  return result;
}

export {
  createFollow,
  getNonFollowers,
  removeFollow,
  getFollowers,
  getFollowings,
};
