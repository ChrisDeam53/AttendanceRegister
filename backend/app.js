var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Adding extra modules
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var userRouter = require('./routes/user.routes');
var moduleRouter = require('./routes/module.routes');
var groupRouter = require('./routes/group.routes');
var groupOptionsRouter = require('./routes/group.options.routes');
var semesterRegistrationRouter = require('./routes/semesterRegistration.routes');
var attendanceIndicatorsRouter = require('./routes/attendanceIndicators.routes');
var editAttendanceRouter = require('./routes/editAttendance.routes');
var createLessonRouter = require('./routes/createLesson.routes');
var deleteLessonRouter = require('./routes/deleteLesson.routes');
var studentAttendanceRouter = require('./routes/studentAttendance.routes');

var app = express();

// adding cors module
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// What the URL already is | What you append to the URL.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Attendance', userRouter);
app.use('/Attendance', moduleRouter);
app.use('/Attendance/modules', groupRouter);
app.use('/Attendance/modules/:id/:groupid', groupOptionsRouter);
app.use('/Attendance/modules/:id/', attendanceIndicatorsRouter)
app.use('/Attendance/modules/:id/', semesterRegistrationRouter);
app.use('/Attendance/modules/:id/', editAttendanceRouter);
app.use('/Attendance/modules/:id/', createLessonRouter);
app.use('/Attendance/modules/:id/', deleteLessonRouter);
app.use('/Attendance/modules/:id/', studentAttendanceRouter);


// new routes for authentication
require('./routes/auth.routes')(app);
require('./routes/security.routes')(app);

//Database connection code
const db = require("./models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
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
    res.render('error');
});

module.exports = app;