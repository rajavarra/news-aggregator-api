const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');

const signUp = (req, res) => {
  const { fullname, email, password } = req.body;

  const newUser = {
    id: uuid(),
    fullname,
    email,
    password: bcrypt.hashSync(password, 8),
    preferences: [],
  };

  try {
    userService.userSignUp(newUser);
    res.status(201).send('User registered successfully.');
  } catch (error) {
    res
      .status(error?.status || 500)
      .send(error?.message || 'Internal Server Error');
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const userCredentials = { email, password };
  try {
    const token = await userService.userSignIn(userCredentials);
    res.status(200).send(token);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send(error?.message || 'Internal Server Error');
  }
};

module.exports = {
  signUp,
  signIn,
};
