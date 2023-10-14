const userService = require('../services/userService');
const axios = require('axios');
const getAllNews = async (reqUser) => {
  const user = userService.users.find((user) => user.email === reqUser.email);
  const preferences = user.preferences.join(' OR ');

  const response = await axios.get(
    // eslint-disable-next-line comma-dangle
    `https://newsapi.org/v2/everything?q=${preferences}&apiKey=${process.env.OPEN_APT_KEY}`
  );
  if (response.status !== 200) {
    const error = new Error();
    error.message =
      'Something went wrong while fething news from external api!';
    error.status = response.status;
    throw error;
  }
  return response.data.articles;
};
const getPreferences = (reqUser) => {
  const user = userService.users.find((user) => user.email === reqUser.email);
  const preferences = user.preferences;
  return preferences;
};
const modifyPreferences = (reqUser, userPreferences) => {
  const user = userService.users.find((user) => user.email === reqUser.email);
  user.preferences = [...userPreferences.preferences];
  return user.preferences;
};

module.exports = {
  getAllNews,
  modifyPreferences,
  getPreferences,
};
