const express = require('express');
const { signUp, signIn } = require('../../controllers/userController');
const { userSignUpSchema, userSignInSchema } = require('../../models/user');
const { commonValidationHandler } = require('../../middlewares/errorHandling');
const userRouter = express.Router();

userRouter.post('/register', commonValidationHandler(userSignUpSchema), signUp);

userRouter.post('/login', commonValidationHandler(userSignInSchema), signIn);

module.exports = userRouter;
