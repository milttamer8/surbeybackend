var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var config = require('./config');
var db = require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pollsRouter = require('./routes/polls');
var pollcrudRouter = require('./routes/pollcrud');
var emailverify = require('./routes/emailverify');
var inviteRouter = require('./routes/invite');

var auth_middleware = require('./auth_middleware');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:4200/'
// }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* token authrization*/
// app.use('/api/polls/create', auth_middleware);
// app.use('/api/polls/response', auth_middleware);
// app.use('/api/polls/userpolldata', auth_middleware);
// app.use('/api/polls/changestatus', auth_middleware);


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/polls', pollsRouter);
app.use('/api/pollcrud', pollcrudRouter);
app.use('/api/emailverify', emailverify);
app.use('/api/invite', inviteRouter);



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

db.connect(config.db_url, config.database, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        console.log('Connected successfully database...');
    }
});

module.exports = app;