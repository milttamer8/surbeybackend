var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');

var db = require('../db');
var config = require('../config');

var _displayResults = config._displayResults;
var _resultCode = config.result_code;

var poll = {};
var query;

/* GET polls listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// insert poll
router.post('/create', function(req, res, next) {
    poll.title = req.body.title;
    if (poll.title === undefined) {
        res.status(205).json(_displayResults(_resultCode.TITLE_UNDEFINED, 'Title is undefined!'));
        return;
    }
    poll.description = req.body.description;
    if (poll.description === undefined) {
        res.status(205).json(_displayResults(_resultCode.DESCRIPTIOIN_UNDEFINED, 'Description is undefined'));
        return;
    }
    poll.answerType = req.body.answerType;
    if (poll.answerType === undefined) {
        res.status(205).json(_displayResults(_resultCode.ANSWERTYPE_UNDEFINED, 'AnswerType is undefined'));
        return;
    }
    poll.option1 = req.body.option1;
    if (poll.option1 === undefined) {
        res.status(205).json(_displayResults(_resultCode.OPTION1_UNDEFINED, 'Option1 is undefined'));
        return;
    }
    poll.option2 = req.body.option2;
    if (poll.option2 === undefined) {
        res.status(205).json(_displayResults(_resultCode.OPTION2_UNDEFINED, 'Option2 is undefined'));
        return;
    }
    poll.dateCreated = req.body.dateCreated;
    if (poll.dateCreated === undefined) {
        res.status(205).json(_displayResults(_resultCode.DATECREATED_UNDEFIND, 'CreatedDate is undefined'));
        return;
    }
    poll.user_id = req.body.user_id;
    if (poll.user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'user_id is undefined'));
        return;
    }
    poll.user_email = req.body.user_email;
    if (poll.user_email === undefined) {
        res.status(205).json(_displayResults(_resultCode.USER_EMAIL_UNDEFINED, 'user_email is undefined'));
        return;
    }
    poll.poll_id = uniqid.time();
    var collection_polls = db.get().collection("polls");
    query = { 'poll_title': poll.title, 'poll_description': poll.description, 'poll_answers': { 'option1': poll.option1, 'option2': poll.option2 } };
    collection_polls.find(query).toArray(function(_err, docs) {
        if (docs[0] == undefined) {
            query = { 'poll_id': poll.poll_id, 'poll_title': poll.title, 'poll_description': poll.description, 'poll_answertype': poll.answerType, 'poll_answers': { 'option1': poll.option1, 'option2': poll.option2 }, 'poll_date_created': poll.dateCreated, 'poll_status': 'false', 'poll_user_id': poll.user_id, 'poll_user_email': poll.user_email };
            collection_polls.insert(query, function(_err, inserted) {
                res.json(_displayResults(_resultCode.POLL_CREATE_SUCCESSFULLY, poll.poll_id, 'Successfully created'));
            });
        } else {
            res.status(201).json(_displayResults(_resultCode.POLL_ALREADY_EXIST, 'Poll already existed'));
        }
    });
});


// update poll
router.post('/update', function(req, res, next) {
    poll.title = req.body.title;
    if (poll.title === undefined) {
        res.status(205).json(_displayResults(_resultCode.TITLE_UNDEFINED, 'Title is undefined!'));
        return;
    }
    poll.description = req.body.description;
    if (poll.description === undefined) {
        res.status(205).json(_displayResults(_resultCode.DESCRIPTIOIN_UNDEFINED, 'Description is undefined'));
        return;
    }
    poll.answerType = req.body.answerType;
    if (poll.answerType === undefined) {
        res.status(205).json(_displayResults(_resultCode.ANSWERTYPE_UNDEFINED, 'AnswerType is undefined'));
        return;
    }
    poll.option1 = req.body.option1;
    if (poll.option1 === undefined) {
        res.status(205).json(_displayResults(_resultCode.OPTION1_UNDEFINED, 'Option1 is undefined'));
        return;
    }
    poll.option2 = req.body.option2;
    if (poll.option2 === undefined) {
        res.status(205).json(_displayResults(_resultCode.OPTION2_UNDEFINED, 'Option2 is undefined'));
        return;
    }
    poll.dateCreated = req.body.dateCreated;
    if (poll.dateCreated === undefined) {
        res.status(205).json(_displayResults(_resultCode.DATECREATED_UNDEFIND, 'CreatedDate is undefined'));
        return;
    }
    poll.user_id = req.body.user_id;
    if (poll.user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'user_id is undefined'));
        return;
    }
    poll.poll_id = req.body.poll_id;
    if (poll.poll_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.POLLID_UNDEFINED, 'poll_id is undefined'));
        return;
    }
    var collection_polls = db.get().collection("polls");

    query = { 'poll_user_id': poll.user_id, 'poll_title': poll.title, 'poll_description': poll.description, 'poll_answers': { 'option1': poll.option1, 'option2': poll.option2 } };
    collection_polls.find(query).toArray(function(_err, docs) {
        if (docs[0] == undefined) {

            query = { 'poll_user_id': poll.user_id, 'poll_id': poll.poll_id };
            collection_polls.find(query).toArray(function(_err, docs0) {
                if (docs0[0] != undefined) {
                    collection_polls.updateOne({ _id: docs0[0]._id }, {
                            $set: { 'poll_title': poll.title, 'poll_description': poll.description, 'poll_answertype': poll.answerType, 'poll_answers': { 'option1': poll.option1, 'option2': poll.option2 }, 'poll_date_created': poll.dateCreated }
                        },
                        function(_err, inserted) {
                            res.json(_displayResults(_resultCode.POLL_UPDATED_SUCCESSFULLY, poll.poll_id, 'Successfully poll updated'));
                        });

                } else {
                    res.status(201).json(_displayResults(_resultCode.POLL_DOES_NOT_EXIST, 'Poll does not exist'));
                }
            });

        } else {
            res.status(201).json(_displayResults(_resultCode.POLL_ALREADY_EXIST, 'Poll already exist'));
        }
    });

});

// delete poll
router.post('/delete', function(req, res, next) {
    poll.user_id = req.body.user_id;
    if (poll.user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'user_id is undefined'));
        return;
    }
    poll.poll_id = req.body.poll_id;
    if (poll.poll_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.POLLID_UNDEFINED, 'poll_id is undefined'));
        return;
    }
    var collection_polls = db.get().collection("polls");
    query = { 'poll_user_id': poll.user_id, 'poll_id': poll.poll_id };
    collection_polls.find(query).toArray(function(_err, docs) {
        if (docs[0] != undefined) {
            collection_polls.deleteOne(query, function(_err, inserted) {
                res.json(_displayResults(_resultCode.POLL_DELETED_SUCCESSFULLY, 'Successfully poll deleted'));
            });
        } else {
            res.status(201).json(_displayResults(_resultCode.POLL_DOES_NOT_EXIST, 'Poll does not exist'));
        }
    });
});


module.exports = router;