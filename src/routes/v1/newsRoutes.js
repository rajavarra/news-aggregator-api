const express = require('express');
const { authenticateUser } = require('../../middlewares/authentication');
const { preferencesSchema } = require('../../models/user');
const { commonValidationHandler } = require('../../middlewares/errorHandling');
const newsController = require('../../controllers/newsController');

const newsRouter = express.Router();
newsRouter.use(authenticateUser);

newsRouter.get('/', newsController.getAllNews);
newsRouter.get('/preferences', newsController.getPreferences);
newsRouter.put(
  '/preferences',
  commonValidationHandler(preferencesSchema),
  newsController.modifyPreferences
);

module.exports = newsRouter;
