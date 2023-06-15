var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var serviceSettingsRouter = require('./routes/serviceSettings');
var serviceSettingsRouter_2 = require('./routes/serviceSettings_2');
var readResultsRouter = require('./routes/read');
var existRouter = require('./routes/exist');

var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var corsOptions = {
//   origin: 'http://localhost:4200',
//   methods: 'GET,PUT,POST,DELETE,OPTIONS',
//   allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin'
// };
// var corsOptions = {
//   origin: 'http://localhost:4200',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors({
//   origin: 'https://p2p.atos.bd4opem.eu'
origin: 'http://localhost:4200'
}))
// app.use(cors(corsOptions));
// app.use(cors());
app.use('/', indexRouter);
app.use('/serviceSettings', serviceSettingsRouter);
app.use('/serviceSettings_2', serviceSettingsRouter_2);
app.use('/read', readResultsRouter);
app.use('/exist', existRouter);



app.post('/ping', function (req, res) {
  res.send(req.body);
  console.log(req.body)
});



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
  res.render('error', { title: 'Error' });  // Modificación aquí
});

module.exports = app;
