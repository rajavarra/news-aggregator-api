const jwt = require('jsonwebtoken');
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ error: 'Please provide Auth token' });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
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
