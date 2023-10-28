require('dotenv').config();
require('module-alias/register');
require('./cacheManager');
const {
  app: { port },
} = require('./configuration/config');
const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/v1/userRoutes');
const newsRouter = require('./routes/v1/newsRoutes');
const { errorHandler } = require('./middlewares/errorHandling');

const PORT = process.env.PORT || port;

const app = express();
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('NEWS API');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/news', newsRouter);

app.use(errorHandler);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server running on port: ${PORT}`);
  } else {
    console.log(`Server Failed To Start. error: ${error}`);
  }
});
