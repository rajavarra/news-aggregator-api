const express = require('express');
const userController = require('../../controllers/userController');
const {
  userSignUpValidation,
  userSignInValidation,
} = require('../../middlewares/errorHandling');
const userRouter = express.Router();

userRouter.post('/register', userSignUpValidation, userController.signUp);

userRouter.post('/login', userSignInValidation, userController.signIn);

module.exports = userRouter;
