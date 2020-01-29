var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var bodyParser = require('body-parser'); 

require('dotenv').config();

const AUTH_USER = process.env.AUTH_USER;
const AUTH_PWD = process.env.AUTH_PWD;
var submit = false;

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/denyAccess', function(request, response) {
    response.render('denyAccess');
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
    response.render('denyAccess');
});

app.get('/success', function(request, response) {
    if((!request.session.loggedin) ||(!submit)) {
        response.render('denyAccess');
    } else {
        submit = false;
        response.render('success');
    }
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
    submit = true;
    console.log("received");
    response.redirect('/success');

});

app.get('/auth', function(request, response) {
    response.render('denyAccess');
});


module.exports = app;