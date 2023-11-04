const userService = require('../services/userService');
const axios = require('axios');
const AppError = require('../utils/AppError');

const getAllNews = async (reqUser) => {
  const user = userService.users.find((user) => user.email === reqUser.email);
  const preferences = user.preferences.join(' OR ');
  console.log('API Called for data');
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${preferences}&apiKey=${process.env.OPEN_APT_KEY}&language=en&searchIn=title`
  );

  if (response.status !== 200) {
    throw new AppError(
      'Something went wrong while fetching news from external api!',
      response.status
    );
  }
  // console.log('API Called for data');
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
