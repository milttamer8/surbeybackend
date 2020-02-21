var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');

var db = require('../db');
var config = require('../config');

var _displayResults = config._displayResults;
var _resultCode = config.result_code;
var key = config.secret_key;

var poll = {};
var resp = {};
var query;


/* GET polls listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// insert or update responses
router.post('/response', function(req, res, next) {

    console.log(req.body);

    resp.poll_id = req.body.poll_id;
    if (resp.poll_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.DESCRIPTIOIN_UNDEFINED, 'poll_id is undefined!'));
        return;
    }
    resp.user_id = req.body.user_id;
    if (resp.user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'user_id is undefined!'));
        return;
    }
    resp.email = req.body.email;
    if (resp.email === undefined) {
        res.status(205).json(_displayResults(_resultCode.EMAIL_UNDEFINED, 'email is undefined!'));
        return;
    }
    //adding title and description
    resp.poll_user_id = req.body.poll_user_id;
    if (resp.poll_user_id === undefined) {
        res.status(205).json(_displayResults(_resultCode.DESCRIPTIOIN_UNDEFINED, 'poll_user_id is undefined!'));
        return;
    }
    resp.title = req.body.title;
    if (resp.title === undefined) {
        res.status(205).json(_displayResults(_resultCode.TITLE_UNDEFINED, 'title is undefined!'));
        return;
    }
    resp.description = req.body.description;
    if (resp.description === undefined) {
        res.status(205).json(_displayResults(_resultCode.DESCRIPTIOIN_UNDEFINED, 'description is undefined!'));
        return;
    }


    resp.experton = req.body.experton;
    if (resp.experton === undefined) {
        res.status(205).json(_displayResults(_resultCode.EXPERTON_UNDEFINED, 'experton is undefined!'));
        return;
    }
    resp.years = req.body.years;
    if (resp.years === undefined) {
        res.status(205).json(_displayResults(_resultCode.YEARS_UNDEFINED, 'years is undefined!'));
        return;
    }
    resp.answer = req.body.answer;
    if (resp.answer === undefined) {
        res.status(205).json(_displayResults(_resultCode.ANSWER_UNDEFINED, 'user_id is undefined!'));
        return;
    }
    resp.date = req.body.date;
    if (resp.date === undefined) {
        res.status(205).json(_displayResults(_resultCode.DATE_UNDEFINED, 'user_id is undefined!'));
        return;
    }
    // Userdata insert or update
    var collection_polls = db.get().collection("polls");
    // var collection_users = db.get().collection("users");
    // query = { 'user_id': resp.user_id };
    // collection_users.find(query).toArray(function(_err, docs) {
    //     if (docs[0] == undefined) {
    //         // res.json('User does not match!');
    //     } else {
    //         var equalState_users = 0;
    //         if (docs[0].poll_response == undefined) {
    //             collection_users.update({ _id: docs[0]._id }, {
    //                 $push: { 'poll_response': { 'poll_id': resp.poll_id, 'answer': resp.answer, 'responseDate': resp.date, 'poll_title': resp.title, 'poll_description': resp.description, 'poll_user_id': resp.poll_user_id } }
    //             }, function(_err, inserted) {
    //                 // res.json("Added Successfully to users!");
    //             });
    //         } else {
    //             if (docs[0].poll_response.length == 1) {

    //                 if (docs[0].poll_response[0].poll_id == resp.poll_id) {
    //                     collection_users.updateOne({ _id: docs[0]._id, 'poll_response.poll_id': resp.poll_id }, {
    //                             $set: { 'poll_response.$.poll_id': resp.poll_id, 'poll_response.$.answer': resp.answer, 'poll_response.$.responseDate': resp.date }
    //                         },
    //                         function(_err, inserted) {
    //                             // res.json("Updated Successfully to users!");
    //                         });
    //                 } else {
    //                     collection_users.update({ _id: docs[0]._id }, {
    //                         $push: { 'poll_response': { 'poll_id': resp.poll_id, 'answer': resp.answer, 'responseDate': resp.date, 'poll_title': resp.poll_title, 'poll_description': resp.description, 'poll_user_id': resp.poll_user_id } }
    //                     }, function(_err, inserted) {
    //                         // res.json("Added Successfully to users");
    //                     });
    //                 }

    //             } else {
    //                 for (temp = 0; temp < docs[0].poll_response.length; temp++) {
    //                     if (docs[0].poll_response[temp].poll_id == resp.poll_id) {
    //                         equalState_users = true;
    //                         break;
    //                     }
    //                 }
    //                 if (equalState_users == false) {
    //                     collection_users.update({ _id: docs[0]._id }, {
    //                         $push: { 'poll_response': { 'poll_id': resp.poll_id, 'answer': resp.answer, 'responseDate': resp.date, 'poll_title': resp.poll_title, 'poll_description': resp.description, 'poll_user_id': resp.poll_user_id } }
    //                     }, function(_err, inserted) {
    //                         // res.json("Added Successfully to users");
    //                     });
    //                 } else {
    //                     collection_users.updateOne({ _id: docs[0]._id, 'poll_response.poll_id': resp.poll_id }, {
    //                             $set: { 'poll_response.$.poll_id': resp.poll_id, 'poll_response.$.answer': resp.answer, 'poll_response.$.responseDate': resp.date }
    //                         },
    //                         function(_err, inserted) {
    //                             // res.json("Updated Successfully to users");
    //                         }
    //                     );
    //                 }
    //             }
    //         }
    //     }
    // });

    // Poll insert or update
    query = { 'poll_id': resp.poll_id };
    collection_polls.find(query).toArray(function(_err, docs) {
        if (docs[0] == undefined) {
            res.status(201).json('This poll does not exist');
        } else {
            var temp = 0;
            var equalState = false;
            if (docs[0].user_response == undefined) {
                collection_polls.update({ _id: docs[0]._id }, {
                    $push: { 'user_response': { 'user_id': resp.user_id, 'user_email': resp.email, 'experton': resp.experton, 'years': resp.years, 'answer': resp.answer, 'responseDate': resp.date } }
                }, function(_err, inserted) {
                    res.json(_displayResults(_resultCode.POLLRES_ADDED_SUCCESSFULLY, docs[0], "Added Successfully!", true));
                });
            } else {
                if (docs[0].user_response.length == 1) {

                    if (docs[0].user_response[0].user_id == resp.user_id) {
                        collection_polls.updateOne({ _id: docs[0]._id, 'user_response.user_id': resp.user_id }, {
                                $set: { 'user_response.$.user_id': resp.user_id, 'user_response.$.answer': resp.answer, 'user_response.$.responseDate': resp.date }
                            },
                            function(_err, inserted) {
                                res.json(_displayResults(_resultCode.POLLRES_UPDATED_SUCCESSFULLY, docs[0], "Updated Successfully!", true));
                            });
                    } else {
                        collection_polls.update({ _id: docs[0]._id }, {
                            $push: { 'user_response': { 'user_id': resp.user_id, 'user_email': resp.email, 'experton': resp.experton, 'years': resp.years, 'answer': resp.answer, 'responseDate': resp.date } }
                        }, function(_err, inserted) {
                            res.json(_displayResults(_resultCode.POLLRES_ADDED_SUCCESSFULLY, docs[0], "Added Successfully!", true));
                        });
                    }

                } else {

                    for (temp = 0; temp < docs[0].user_response.length; temp++) {
                        if (docs[0].user_response[temp].user_id == resp.user_id) {
                            equalState = true;
                            break;
                        }
                    }
                    if (equalState == false) {
                        collection_polls.update({ _id: docs[0]._id }, {
                            $push: { 'user_response': { 'user_id': resp.user_id, 'user_email': resp.email, 'experton': resp.experton, 'years': resp.years, 'answer': resp.answer, 'responseDate': resp.date } }
                        }, function(_err, inserted) {
                            res.json(_displayResults(_resultCode.POLLRES_ADDED_SUCCESSFULLY, docs[0], "Added Successfully!", true));
                        });
                    } else {
                        collection_polls.updateOne({ _id: docs[0]._id, 'user_response.user_id': resp.user_id }, {
                                $set: { 'user_response.$.user_id': resp.user_id, 'user_response.$.answer': resp.answer, 'user_response.$.responseDate': resp.date }
                            },
                            function(_err, inserted) {
                                res.json(_displayResults(_resultCode.POLLRES_UPDATED_SUCCESSFULLY, "Updated Successfully!", docs[0], true));
                            }
                        );
                    }

                }
            }
        }
    });
});

router.post('/userpolldata', function(req, res, next) {
    resp.user_id = req.body.user_id;
    if (resp.user_id == undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'User_id is undefined!'));
        return;
    }
    var collection_polls = db.get().collection("polls");
    query = { 'poll_user_id': resp.user_id };
    collection_polls.find(query).toArray(function(_err, docs) {
        if (docs[0] == undefined) {
            res.status(205).json(_displayResults(_resultCode.POLL_DOES_NOT_EXIST, 'Poll does not existed!'));
        } else {
            var result = {
                message: "Poll is available",
                data: docs
            }
            res.json(_displayResults(_resultCode.GET_USER_POLL_SUCCESS, result, true));
        }
    });
});

router.post('/changestatus', function(req, res, next) {
    resp.user_id = req.body.user_id;
    if (resp.user_id == undefined) {
        res.status(205).json(_displayResults(_resultCode.USERID_UNDEFINED, 'User_id is undefined!'));
        return;
    }
    resp.poll_id = req.body.poll_id;
    if (resp.poll_id == undefined) {
        res.status(205).json(_displayResults(_resultCode.POLLID_UNDEFINED, 'Poll_id is undefined!'));
        return;
    }
    resp.poll_status = req.body.poll_status;
    if (resp.poll_status == undefined) {
        res.status(205).json(_displayResults(_resultCode.POLLID_UNDEFINED, 'Poll_status is undefined!'));
        return;
    }

    var collection_polls = db.get().collection("polls");
    query = { 'poll_user_id': resp.user_id, 'poll_id': resp.poll_id };
    collection_polls.find(query).toArray(function(_err, docs) {
        if (docs[0] == undefined) {
            res.status(205).json(_displayResults(_resultCode.POLL_DOES_NOT_EXIST, 'Poll does not existed!'));
        } else {
            if (resp.poll_status == "true") {
                collection_polls.updateOne({ _id: docs[0]._id }, {
                        $set: { 'poll_status': "true" }
                    },
                    function(_err, inserted) {
                        res.status(200).json(_displayResults(_resultCode.POLL_STATUS_CAHNGE_SUCCESS, "Status Changed Successfully", true));
                    });
            } else if (resp.poll_status == "false") {
                collection_polls.updateOne({ _id: docs[0]._id }, {
                        $set: { 'poll_status': "false" }
                    },
                    function(_err, inserted) {
                        res.status(200).json(_displayResults(_resultCode.POLL_STATUS_CAHNGE_SUCCESS, "Status Changed Successfully", true));
                    });
            } else {
                res.status(205).json(_displayResults(_resultCode.NOTHING_HAPPEND, "Nothing happened"));
            }
        }
    });
});

router.post('/getpoll', function(req, res, next) {
    var collection_polls = db.get().collection("polls");
    collection_polls.find().toArray(function(_err, docs) {
        if (docs[0] == undefined) {
            res.status(205).json(_displayResults(_resultCode.POLL_DOES_NOT_EXIST, 'Poll does not existed!'));
        } else {
            res.status(200).json(_displayResults(_resultCode.GET_TOTAL_POLL_SUCCESS, docs, "Send Sucessfully", true));
        }
    });
});

module.exports = router;