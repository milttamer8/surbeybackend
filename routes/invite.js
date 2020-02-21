var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');

var db = require('../db');
var config = require('../config');

var _displayResults = config._displayResults;
var _resultCode = config.result_code;

var resp = {};
var invite = {};
var query;

router.post('/send', function(req, res, next) {
    resp.rece_user_id = req.body.rece_user_id;
    if (resp.rece_user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'rece_user_id is undefined!'));
        return;
    }
    resp.rece_user_email = req.body.rece_user_email;
    if (resp.rece_user_email === undefined) {
        res.status(205).json(_displayResults(_resultCode.USER_EMAIL_UNDEFINED, 'rece_user_email is undefined!'));
        return;
    }
    resp.poll_id = req.body.poll_id;
    if (resp.poll_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.POLLID_UNDEFINED, 'poll_id is undefined!'));
        return;
    }
    resp.user_id = req.body.user_id;
    if (resp.user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'user_id is undefined!'));
        return;
    }
    resp.user_email = req.body.user_email;
    if (resp.user_email === undefined) {
        res.status(205).json(_displayResults(_resultCode.USER_EMAIL_UNDEFINED, 'user_email is undefined!'));
        return;
    }
    resp.sendDate = req.body.sendDate;
    if (resp.sendDate === undefined) {
        res.status(205).json(_displayResults(_resultCode.POLL_USERID_UNDEFINED, 'user_email is undefined!'));
        return;
    }
    resp.poll_title = req.body.poll_title;
    if (resp.poll_title === undefined) {
        res.status(205).json(_displayResults(_resultCode.TITLE_UNDEFINED, 'poll_title is undefined!'));
        return;
    }
    resp.poll_description = req.body.poll_description;
    if (resp.poll_description === undefined) {
        res.status(205).json(_displayResults(_resultCode.DESCRIPTIOIN_UNDEFINED, 'poll_description is undefined!'));
        return;
    }
    resp.poll_answer = req.body.poll_answer;
    if (resp.poll_answer === undefined) {
        res.status(205).json(_displayResults(_resultCode.ANSWER_UNDEFINED, 'poll_answer is undefined!'));
        return;
    }
    var invite_id = uniqid.time();
    // var collection_polls = db.get().collection("polls");
    // var collection_users = db.get().collection("users");
    var collection_invite = db.get().collection("invite");

    // query = { "user_id": resp.res_user_id }
    // collection_users.find(query).toArray(function(_err, docs) {
    //     if (docs[0] == undefined) {
    //         // res.status(205).json(_displayResults(_resultCode.EMAIL_UNDEFINED, 'This poll does not exist'));
    //     } else {
    //         collection_users.updateOne({ _id: docs[0]._id, 'poll_response.poll_id': resp.poll_id }, {
    //             $set: { "poll_response.$.invite_status": resp.invite_status }
    //         }, function(err, inserted) {
    //             // res.status(200).json(_displayResults(_resultCode.EMAIL_UNDEFINED, 'Successfully sent invitation'));
    //         });
    //     }
    // });

    // query = { "poll_id": resp.poll_id }
    // collection_polls.find(query).toArray(function(_err, docs) {
    //     if (docs[0] == undefined) {
    //         res.status(205).json(_displayResults(_resultCode.EMAIL_UNDEFINED, 'This poll does not exist!'));
    //     } else {
    //         collection_polls.updateOne({ _id: docs[0]._id, 'user_response.user_id': resp.res_user_id }, {
    //             $set: { "user_response.$.invite_status": resp.invite_status }
    //         }, function(err, inserted) {
    //             res.status(200).json(_displayResults(_resultCode.EMAIL_UNDEFINED, 'Successfully sent invitation!'));
    //         });
    //     }
    // });
    query = { 'poll_id': resp.poll_id, "user_id": resp.user_id, "rece_user_id": resp.rece_user_id }
    collection_invite.find(query).toArray(function(_err, docs) {

        if (docs[0] == undefined) {
            query = { "invite_id": invite_id, "poll_id": resp.poll_id, "poll_title": resp.poll_title, "poll_description": resp.poll_description, "poll_answer": resp.poll_answer, "user_id": resp.user_id, "invite_status": "Pending", "user_email": resp.user_email, "rece_user_id": resp.rece_user_id, "rece_user_email": resp.rece_user_email, "sendDate": resp.sendDate };
            collection_invite.insert(query, function(_err, inserted) {
                res.json(_displayResults(_resultCode.INVTIED_SUCCESSFULL, 'Successfully sent!'));
            });
        } else {
            if (docs[0].invite_status == "Accepted") {
                res.json(_displayResults(_resultCode.ALREADY_ACCEPTED, 'Aready Invited!'));
            } else if (docs[0].invite_status == "Rejected") {
                res.json(_displayResults(_resultCode.ALREADY_REJECTED, 'Aready Rejected!'));
            } else if (docs[0].invite_status == "Pending") {
                res.json(_displayResults(_resultCode.ALREADY_PEDING, 'Still Pending!'));
            }
        }
    });
});


router.post('/accept', function(req, res, next) {
    resp.rece_user_id = req.body.rece_user_id;
    if (resp.rece_user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'rece_user_id is undefined!'));
        return;
    }
    resp.poll_id = req.body.poll_id;
    if (resp.poll_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.POLLID_UNDEFINED, 'poll_id is undefined!'));
        return;
    }
    resp.user_id = req.body.user_id;
    if (resp.user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'user_id is undefined!'));
        return;
    }
    resp.acceptDate = req.body.acceptDate;
    if (resp.acceptDate === undefined) {
        res.status(205).json(_displayResults(_resultCode.POLL_USERID_UNDEFINED, 'user_email is undefined!'));
        return;
    }

    var collection_invite = db.get().collection("invite");

    query = { 'poll_id': resp.poll_id, "user_id": resp.user_id, "rece_user_id": resp.rece_user_id }
    collection_invite.find(query).toArray(function(_err, docs) {
        if (docs[0] == undefined) {
            res.json(_displayResults(_resultCode.INVITE_NOT_EXISTED, 'Ivitation does not existed!'));
        } else {
            if (docs[0].invite_status == "Pending") {
                query = { _id: docs[0]._id }
                collection_invite.updateOne(query, { $set: { "invite_status": "Accepted", "acceptDate": resp.sendDate } }, function(_err, inserted) {
                    res.json(_displayResults(_resultCode.INVITE_ACCEPTED, 'Successfully Accepted!'));
                });
            } else if (docs[0].invite_status == "Accepted") {
                res.json(_displayResults(_resultCode.ALREADY_ACCEPTED, 'Already Accepted!'));
            } else if (docs[0].invite_status == "Rejected") {
                res.json(_displayResults(_resultCode.ALREADY_REJECTED, 'Already Rejected!'));
            }
        }
    });
});

router.post('/reject', function(req, res, next) {
    resp.rece_user_id = req.body.rece_user_id;
    if (resp.rece_user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'rece_user_id is undefined!'));
        return;
    }
    resp.poll_id = req.body.poll_id;
    if (resp.poll_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.POLLID_UNDEFINED, 'poll_id is undefined!'));
        return;
    }
    resp.user_id = req.body.user_id;
    if (resp.user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'user_id is undefined!'));
        return;
    }
    resp.acceptDate = req.body.acceptDate;
    if (resp.acceptDate === undefined) {
        res.status(205).json(_displayResults(_resultCode.POLL_USERID_UNDEFINED, 'user_email is undefined!'));
        return;
    }

    var collection_invite = db.get().collection("invite");

    query = { 'poll_id': resp.poll_id, "user_id": resp.user_id, "rece_user_id": resp.rece_user_id }
    collection_invite.find(query).toArray(function(_err, docs) {
        if (docs[0] == undefined) {
            res.json(_displayResults(_resultCode.INVITE_NOT_EXISTED, 'Ivitation does not existed!'));
        } else {
            if (docs[0].invite_status == "Pending") {
                query = { _id: docs[0]._id }
                collection_invite.updateOne(query, { $set: { "invite_status": "Rejected", "rejectDate": resp.sendDate } }, function(_err, inserted) {
                    res.json(_displayResults(_resultCode.INVITE_REJECTED, 'Successfully Rejceted!'));
                });
            } else if (docs[0].invite_status == "Accpted") {
                res.json(_displayResults(_resultCode.ALREADY_ACCEPTED, 'Already Accepted!'));
            } else if (docs[0].invite_status == "Rejected") {
                res.json(_displayResults(_resultCode.ALREADY_REJECTED, 'Already Rejected!'));
            }
        }
    });
});

router.post('/userstatus', function(req, res, next) {
    resp.poll_id = req.body.poll_id;
    if (resp.poll_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.POLLID_UNDEFINED, 'poll_id is undefined!'));
        return;
    }
    resp.user_id = req.body.user_id;
    if (resp.user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'user_id is undefined!'));
        return;
    }

    var collection_invite = db.get().collection("invite");

    query = { 'poll_id': resp.poll_id, "user_id": resp.user_id }
    collection_invite.find(query).toArray(function(_err, docs) {
        if (docs[0] == undefined) {
            res.json(_displayResults(_resultCode.INVITE_NOT_EXISTED, 'Ivitation does not existed!'));
        } else {
            res.json(_displayResults(_resultCode.GET_INVITATION_SUCCESSFULLY, docs));
        }
    });

});

router.post('/userrecestatus', function(req, res, next) {
    resp.user_id = req.body.user_id;
    if (resp.user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'user_id is undefined!'));
        return;
    }

    var collection_invite = db.get().collection("invite");

    query = { "rece_user_id": resp.user_id }
    collection_invite.find(query).toArray(function(_err, docs) {
        if (docs[0] == undefined) {
            res.json(_displayResults(_resultCode.INVITE_NOT_EXISTED, 'Ivitation does not existed!'));
        } else {
            res.json(_displayResults(_resultCode.GET_RECEPTION_SUCCESSFULLY, docs));
        }
    });

});

module.exports = router;