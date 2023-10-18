const express = require('express');
const { authenticateUser } = require('../../middlewares/authentication');
const { preferencesSchema } = require('../../models/user');
const { commonValidationHandler } = require('../../middlewares/errorHandling');
const newsController = require('../../controllers/newsController');

const newsRouter = express.Router();

newsRouter.get('/', authenticateUser, newsController.getAllNews);
newsRouter.get('/preferences', authenticateUser, newsController.getPreferences);
newsRouter.put(
  '/preferences',
  authenticateUser,
  commonValidationHandler(preferencesSchema),
  newsController.modifyPreferences
);

module.exports = newsRouter;
