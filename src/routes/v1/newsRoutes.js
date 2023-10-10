const express = require('express');
const { authenticateUser } = require('../../middlewares/authentication');
const newsController = require('../../controllers/newsController');
// const {
//   userSignUpValidation,
//   userSignInValidation,
// } = require('../../middlewares/errorHandling');
const newsRouter = express.Router();

newsRouter.get('/', authenticateUser, newsController.getAllNews);
newsRouter.get('/preferences', authenticateUser, newsController.getPreferences);
newsRouter.put(
  '/preferences',
  authenticateUser,
  // eslint-disable-next-line comma-dangle
  newsController.modifyPreferences
);

module.exports = newsRouter;
