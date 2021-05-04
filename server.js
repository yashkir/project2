var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var passport = require('passport');
var MongoStore = require('connect-mongo');
var methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var transactionsRouter = require('./routes/transactions');
var usersRouter = require('./routes/users');
var ledgersRouter = require('./routes/ledgers');

var app = express();

// view engine setup
app.use(expressLayouts);
app.set('layout', './layouts/main'); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Let our templates know the username and info
app.use((req, res, next) => {
  if (req.user) {
    res.locals.username = req.user.username;
    res.locals.user = req.user;
  }
  if (req.query.info) {
    res.locals.info = req.query.info;
  }
  next();
});

app.use('/', usersRouter);
app.use('/', indexRouter);
app.use('/transactions', transactionsRouter);
app.use('/ledgers', ledgersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title:'error'});
});

module.exports = app;
