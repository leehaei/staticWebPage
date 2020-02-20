var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('login', {
        page:'Login',
        menuId: 'login'
    });
});

router.get('/home', function(req, res) {
    res.render('home', {
        page:'Home',
        menuId: 'home'
    });
});

router.get('/logout', function(req, res) {
    res.render('logout', {
        page:'Logout',
        menuId: 'logout'
    });
});

router.get('/denyAccess', function(req, res) {
    res.render('denyAccess', {
        page:'DenyAccess',
        menuId: 'denyAccess'
    });
});

router.get('/incorrect', function(req, res) {
    res.render('incorrect', {
        page:'Incorrect',
        menuId: 'incorrect'
    });
});

router.get('/success', function(req, res) {
    res.render('success', {
        page:'Success',
        menuId: 'success'
    });
});

router.get('/slack', function(req, res) {
    res.render('slack', {
        page:'Slack',
        menuId: 'slack'
    });
});

module.exports = router;