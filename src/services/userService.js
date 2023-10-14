const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/AppError');
const users = [];

const userSignUp = (newUser) => {
  const isUserExists =
    users.findIndex((user) => user.email === newUser.email) > -1;
  if (!isUserExists) {
    users.push(newUser);
    return;
  }
  throw new AppError(`User with email ${newUser.email} already exists`, 400);
};

const userSignIn = async (userCredentials) => {
  const { email, password } = userCredentials;
  const findUserIndex = users.findIndex((user) => user.email === email);

  if (findUserIndex === -1) {
    throw new AppError(`User with email ${email} does not exist`, 400);
  }

  const match = await bcrypt.compare(password, users[findUserIndex].password);

  if (!match) {
    throw new AppError('Invalid Password!', 400);
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = {
  userSignUp,
  userSignIn,
  users,
};
