var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var bodyParser = require('body-parser'); 
//var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//const http = require('http');
require('dotenv').config();

const AUTH_USER = process.env.AUTH_USER;
const AUTH_PWD = process.env.AUTH_PWD;

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/*
http.createServer(function(req, res){
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Hello! Server created\n');
  }).listen(8080);
  */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
*/
app.get('/cannotView', function(request, response) {
    response.render('cannotView');
});

app.get('/denyAccess', function(request, response) {
    response.render('cannotView');
});

//main page
app.get('/home', function(request, response) {
    if(!request.session.loggedin) {
        response.render('denyAccess');
    } else {
        response.render('home');
    }
});

app.get('/incorrect', function(request, response) {
    response.render('cannotView');
});

//login/main page
app.get('/', function(request, response) {
    if(!request.session.loggedin) {
        response.render('login');
    } else {
        response.render('home');
    }
});

//logs out of session if logged in
app.get('/logout', function(request, response) {
    if(!request.session.loggedin) {
        response.render('denyAccess');
    } else {
        console.log("\n************** ENDED SESSION ***************");
        console.log("Username: "+ request.session.username);
        console.log("********************************************\n");
        request.session.destroy();
        response.render('logout');
    }
});

//Authenticates login
app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if ((username == AUTH_USER) && (password == AUTH_PWD)) {
        console.log("\n************** STARTED SESSION *************");
        console.log("Username: "+ username);
        console.log("********************************************\n");
        request.session.loggedin = true;
		request.session.username = username;
        response.redirect('/home');
        response.end();
	} else {
        response.render('incorrect');
        response.end();
	}
});

//Receives form submission
app.post('/req', function(request, response) {
    var fname = request.body.q1;
    var lname = request.body.q2;
    var email = request.body.q3;
    var duedate = request.body.q4;
    var summary = request.body.q5;
    var bImpact = request.body.q6;
    var frImpact = request.body.q7;
    var pRisks = request.body.q8;
    var notes = request.body.q9;

    console.log("received");
    response.redirect('/home');
    /*
    var res;
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8080/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        res = xhr.responseText;
    }
};
var data = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
xhr.send(data);
console.log(JSON.parse(res));
*/
});

app.get('/auth', function(request, response) {
    response.render('cannotView');
});


//app.listen(3000, () => console.log("NodeJS Web Application is now running on port 3000"));


module.exports = app;