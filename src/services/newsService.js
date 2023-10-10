const userService = require('../services/userService');
const getAllNews = () => {};
const getPreferences = (reqUser) => {
  const user = userService.users.find((user) => user.email === reqUser.email);
  const preferances = user.preferences;
  return preferances;
};
const modifyPreferences = (reqUser, userPreferances) => {
  const user = userService.users.find((user) => user.email === reqUser.email);
  user.preferences = userPreferances;
  return user.preferences;
};

module.exports = {
  getAllNews,
  modifyPreferences,
  getPreferences,
};
