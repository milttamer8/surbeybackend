var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var jwt = require('jsonwebtoken');


var db = require('../db');
var config = require('../config');

var _displayResults = config._displayResults;
var _resultCode = config.result_code;


var user = {};

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
    user.email = req.body.email;
    if (user.email === undefined) {
        res.status(205).json(_displayResults(_resultCode.EMAIL_UNDEFINED, 'Email(email) is undefined'));
        return;
    }
    user.password = req.body.password;
    if (user.password === undefined) {
        res.status(205).json(_displayResults(_resultCode.PASSWORD_UNDEFINED, 'Password(password) is undefined'));
        return;
    }
    user.experton = req.body.experton;
    if (user.experton === undefined) {
        res.status(205).json(_displayResults(_resultCode.PASSWORD_UNDEFINED, 'Expert On is undefined'));
        return;
    }
    user.years = req.body.years;
    if (user.years === undefined) {
        res.status(205).json(_displayResults(_resultCode.PASSWORD_UNDEFINED, 'Experiences years is undefined'));
        return;
    }
    user.joinDate = req.body.joinDate;
    if (user.joinDate === undefined) {
        res.status(205).json(_displayResults(_resultCode.PASSWORD_UNDEFINED, 'Join Date is undefined'));
        return;
    }

    var collection = db.get().collection("users");
    var query = { 'email': user.email };
    collection.find(query).toArray(function(_err, docs) {
        if (docs[0] == undefined) {
            query = { 'user_id': uniqid.time(), 'email': user.email, 'password': user.password, 'experton': user.experton, 'years': user.years, 'joinDate': user.joinDate };
            collection.insertOne(query, function(_err, inserted) {
                res.json(_displayResults(_resultCode.USER_CREATED_SUCCESS, 'Successfully created', true));
            });
        } else {
            res.status(201).json(_displayResults(_resultCode.EMAIL_ALREADY_EXIST, 'This email already exist'));
        }
    });
});

router.post('/login', function(req, res, next) {
    var email = req.body.email;
    if (email === undefined) {
        res.status(205).json(_displayResults(_resultCode.EMAIL_UNDEFINED, 'Email(email) is undefined'));
        return;
    }
    var password = req.body.password;
    if (password === undefined) {
        res.status(205).json(_displayResults(_resultCode.PASSWORD_UNDEFINED, 'Password(password) is undefined'));
        return;
    }
    var collection = db.get().collection("users");
    var query = { 'email': email };
    collection.find(query).toArray(function(_err, docs) {
        console.log(docs[0]);
        if (docs[0] == undefined) {
            res.status(201).json(_displayResults(_resultCode.LOGIN_EMAIL_INVALID, 'Email is incorrect'));
        } else if (docs[0].password != password) {
            res.status(201).json(_displayResults(_resultCode.LOGIN_PASSWORD_INVALID, 'Password is incorrect'));
        } else {

            // if eveything is okey let's create our token
            var userId = docs[0]['user_id'];
            const payload = {
                audience: config.user_token.audience,
                issuer: config.user_token.issuer,
                subject: userId,
                notBefore: (new Date()).toISOString()
            };
            var key = config.secret_key;
            var token = jwt.sign(payload, key, {
                expiresIn: 3600 // expires in 1 hour
            });
            var result = {
                message: 'user authentication done',
                token: token,
                id: userId,
                email: docs[0].email,
                experton: docs[0].experton,
                joinDate: docs[0].joinDate,
                years: docs[0].years
            };
            res.json(_displayResults(_resultCode.LOGIN_SUCCESS, result, true));
        }
    });
});


module.exports = router;