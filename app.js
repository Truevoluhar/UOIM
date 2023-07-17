var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
var userModel = require('./models/usermodel');


mongoose.connect('mongodb+srv://adminjon:adminjon123@cluster0.620bas9.mongodb.net/QRCode?retryWrites=true&w=majority');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newPersonRouter = require("./routes/newperson");
var personlistRouter = require("./routes/personlist");
var checkmealRouter = require("./routes/checkmeal");
var qrscannerRouter = require("./routes/qrcamera");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/newperson", newPersonRouter);
app.use("/personlist", personlistRouter);
app.use("/checkmeal", checkmealRouter);
app.use("/qrcamera", qrscannerRouter);

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
  res.render('error');
});

schedule.scheduleJob('00 22 * * *', async function() {
  try {
    await userModel.updateMany(
      {},
      { $set: { meal: false } }
    );
    console.log('User statuses updated and reset successfully');
  } catch (err) {
    console.error('Failed to update and reset user statuses:', err);
  }
});


// schedule.scheduleJob('*/5 * * * *', async function() {
/* try {
  await userModel.updateMany(
    {},
    { $set: { meal: true } }
  );
  console.log('User statuses updated successfully');
} catch (err) {
  console.error('Failed to update user statuses:', err);
}
}); */

module.exports = app;
