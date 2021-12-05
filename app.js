/*
| Express Framwork
*/
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();
require('passport');

/**
 * Add package to experss by npm 
 */
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv').config();
var createError = require('http-errors');
var passport = require('./passport');

/**
 * Routers
 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var passportRouter = require('./routes/passport');
var registertRouter = require('./routes/register');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');

app.use(passport.initialize())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Add routers to experss
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/passport', passportRouter);
app.use('/api/register', registertRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

/**
 * Errors hadeling
 */
app.use((req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
  if(err.name == 'MongoError' || err.name == 'ValidationError' || err.name == 'CastError'){
    err.status = 422;
  }
  res.status(err.status || 500).json({ message : err.message || "some error occurred."})
});

/**
 * Connect to mongodb
 */
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if(err) throw err;
  console.log('Connected successfully');
});

module.exports = app;