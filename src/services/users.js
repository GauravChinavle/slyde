import {
  insertUser,
  fetchAllUsers,
  fetchUserByID,
  deleteUser,
  updateUser,
  login,
} from "../dal/users.js";
import { generateToken } from "../utils/index.js";
import { accessTokenValidity } from "../config/index.js";

async function createUser(data) {
  const result = await insertUser(data);
  return result;
}

async function getAllUsers() {
  const result = await fetchAllUsers();
  return result;
}

async function getUserByID(id) {
  const result = await fetchUserByID(id);
  if (result) return result;
  throw {
    statusCode: 400,
    message: "No user found!",
  };
}

async function removeUserByID(id) {
  const result = await deleteUser(id);
  return result;
}

async function findAndUpdateUserByID(id, data) {
  const result = await updateUser(id, data);
  return result;
}

async function loginUser(data) {
  const result = await login(data);
  if (result) {
    const token = generateToken(result);
    return {
      token,
      expires_in: accessTokenValidity,
    };
  }
  throw {
    message: "Invalid user!",
    data: {},
  };
}

export {
  createUser,
  getAllUsers,
  getUserByID,
  removeUserByID,
  findAndUpdateUserByID,
  loginUser,
};
