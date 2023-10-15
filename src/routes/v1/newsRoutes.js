const express = require('express');
const { authenticateUser } = require('../../middlewares/authentication');
// const { preferencesValidation } = require('../../middlewares/errorHandling');
const newsController = require('../../controllers/newsController');

const newsRouter = express.Router();

newsRouter.get('/', authenticateUser, newsController.getAllNews);
newsRouter.get(
  '/preferences',
  authenticateUser,
  // eslint-disable-next-line comma-dangle
  newsController.getPreferences
);
newsRouter.put(
  '/preferences',
  authenticateUser,
  // eslint-disable-next-line comma-dangle
  newsController.modifyPreferences
);

module.exports = newsRouter;
