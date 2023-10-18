const redis = require('redis');

const config = require('./configuration/config');

const redisClient = redis.createClient({
  port: config.redis.port,
  host: config.redis.host,
});
redisClient.connect();
redisClient.on('connect', () => {
  console.log('Redis is connected');
});

redisClient.on('ready', () => {
  console.log('Redis is connected and ready...');
});

redisClient.on('error', (err) => {
  console.log('Redis error.', err);
});

redisClient.on('end', () => {
  console.log('client disconnected from redis');
});

process.on('SIGINT', () => {
  redisClient.quit();
});

module.exports = redisClient;
