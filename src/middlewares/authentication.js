const jwt = require('jsonwebtoken');
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ error: 'Please provide Auth token' });
  }
  jwt.verify(token, 'raja1235', (err, user) => {
    if (err) {
      return res.status(401).send({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateUser,
};
