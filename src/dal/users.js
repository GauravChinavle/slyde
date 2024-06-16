import { User } from "./models/index.js";

function insertUser(data) {
  const result = User.create(data);
  return result;
}

function fetchAllUsers() {
  const result = User.find({});
  return result;
}

function fetchUserByID(id) {
  const result = User.findById(id);
  return result;
}

function deleteUser(id) {
  const result = User.findByIdAndDelete(id);
  return result;
}

function updateUser(id, data) {
  const result = User.findByIdAndUpdate(id, data, { new: true });
  return result;
}

function login(data) {
  const result = User.findOne(data);
  return result;
}

export {
  insertUser,
  fetchAllUsers,
  fetchUserByID,
  deleteUser,
  updateUser,
  login,
};
