require('module-alias/register');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/v1/userRoutes');
const newsRouter = require('./routes/v1/newsRoutes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('NEWS API');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/news', newsRouter);
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server running on port: ${PORT}`);
  } else {
    console.log(`Server Failed To Start. error: ${error}`);
  }
});
