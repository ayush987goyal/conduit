const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRouter = require('./api/routes/users');
const userRouter = require('./api/routes/user');
const articlesRouter = require('./api/routes/articles');
const tagsRouter = require('./api/routes/tags');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/user', userRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/tags', tagsRouter);

mongoose.connect(process.env.MONGOLAB_URI);
mongoose.Promise = global.Promise;

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

module.exports = app;
