const express = require('express');
const userController = require('../../controllers/userController');
const { userSignUpSchema, userSignInSchema } = require('../../models/user');
const { commonValidationHandler } = require('../../middlewares/errorHandling');
const userRouter = express.Router();

userRouter.post(
  '/register',
  commonValidationHandler(userSignUpSchema),
  // eslint-disable-next-line comma-dangle
  userController.signUp
);

userRouter.post(
  '/login',
  commonValidationHandler(userSignInSchema),
  // eslint-disable-next-line comma-dangle
  userController.signIn
);

module.exports = userRouter;
