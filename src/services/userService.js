const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = [];

const userSignUp = (newUser) => {
  const isUserExists =
    users.findIndex((user) => user.email === newUser.email) > -1;

  if (isUserExists) {
    const error = new Error();
    error.message = `User with email ${newUser.email} already exists`;
    error.status = 400;
    throw error;
  }
  users.push(newUser);
};

const userSignIn = async (userCredentials) => {
  const { email, password } = userCredentials;
  const findUserIndex = users.findIndex((user) => user.email === email);

  if (findUserIndex === -1) {
    const error = new Error(`User with email ${email} does not exist`);
    error.status = 400;
    throw error;
  }

  const match = await bcrypt.compare(password, users[findUserIndex].password);

  if (match) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
    return token;
  } else {
    const error = new Error();
    error.message = 'Invalid Password!';
    error.status = 400;
    throw error;
  }
};

module.exports = {
  userSignUp,
  userSignIn,
  users,
};
