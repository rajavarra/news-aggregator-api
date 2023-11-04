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
  redis: {
    port: 6379,
    host: '127.0.0.1',
  },
};

module.exports = config;
