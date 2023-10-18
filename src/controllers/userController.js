const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const {
  bcrypt: { salt },
} = require('../configuration/config');
const userService = require('../services/userService');

const signUp = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const newUser = {
    id: uuid(),
    firstname,
    lastname,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, salt),
    preferences: [],
  };

  try {
    userService.userSignUp(newUser);
    res.status(201).send('User registered successfully.');
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await userService.userSignIn({
      email: email.toLowerCase(),
      password,
    });
    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
};
