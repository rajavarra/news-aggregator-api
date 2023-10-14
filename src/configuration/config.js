const config = {
  app: {
    port: 3000,
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'db',
  },
  bcrypt: {
    salt: 8,
  },
};

module.exports = config;
