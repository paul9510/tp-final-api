const User = require('../models/User');

const createUser = async (data) => {
  return await User.create(data);
};

const searchUsers = async (query) => {
  const filter = {};
  if (query.firstName) filter.firstName = { $regex: query.firstName, $options: 'i' };
  if (query.lastName) filter.lastName = { $regex: query.lastName, $options: 'i' };
  if (query.email) filter.email = { $regex: query.email, $options: 'i' };

  return await User.find(filter);
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};


module.exports = {
  createUser,
  searchUsers,
  getUserById,
  updateUser,
  deleteUser
};