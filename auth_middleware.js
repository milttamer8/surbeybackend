var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var config = require('./config');

var _resultCode = config.result_code;
var _displayResults = config._displayResults;
// set secret
var key = config.secret_key;

var token;
var token_decode;

router.post('/', (req, res, next) => {
    // check header for the token
    token = req.headers.token;
    if (token) {
        console.log(token);

        // verifies secret and checks if the token is expired
        jwt.verify(token, key, (err, decoded) => {
            console.log(decoded);
            if (decoded == undefined) {
                res.status(201).json(_displayResults(_resultCode.EXPECTED_BEARER_TOKEN, "Token has expired"));
            } else {
                if (err) {
                    res.status(401).json(_displayResults(_resultCode.INVALID_USER_TOKEN, err));
                } else {
                    // if everything is good, save to request for use in other routes
                    token_decode = decoded;
                    next();
                }
            }
        });
    } else {
        // if there is no token
        res.status(401).json(_displayResults(_resultCode.USER_TOKEN_NO_PROVIDED, 'Must set user token'));
    }
});

module.exports = router;