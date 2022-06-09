var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var drugsRouter = require('./routes/drugs');
var patientsRouter = require('./routes/pazients')
var operationsRouter = require('./routes/operations')
var medicAssignmentRouter = require('./routes/medic-assignments')
var prescription = require('./routes/prescriptions')
var vitalValues = require('./routes/vital-values')
var administrations = require('./routes/aministrations')
var messages = require('./routes/messages')

var app = express();
app.use(cookieParser());

var cors= require('cors');
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  credentials: true,
}))

// mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/iHospital', (err) => {
  if (err)
    console.log("error connection mongodb");
  else
    console.log("connected mongodb!")
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/value-chart', (req, res) => {
  res.send(val.valChart);
});

// passport & session
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(session({
  name: 'myname.sid',
  resave: true,
  saveUninitialized: true,
  secret: 'secret',
  cookie: {
    maxAge: 36000000,
    httpOnly: false,
    secure: false,
  },
  store: MongoStore.create({mongoUrl: 'mongodb://localhost/iHospital'})
}));

require('./config/passport-config');
app.use(passport.initialize());
app.use(passport.session());

// socket
const http = require('http').Server(app);
const io = require('socket.io')(http);
const val = require('./valueChart');
const port = 4000;

setInterval(function () {
  val.updateValueChart();
  io.sockets.emit('chart', val.valChart[0]);
}, 1000);

io.on('connection', function (socket) {
  console.log('a user connected');
});

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/drugs', drugsRouter);
app.use('/patients', patientsRouter);
app.use('/operations', operationsRouter);
app.use('/medic-assignments', medicAssignmentRouter);
app.use('/prescriptions', prescription);
app.use('/vital-values', vitalValues);
app.use('/administrations', administrations);
app.use('/messages', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.header("Access-Control-Allow-Origin", "localhost:4200");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
