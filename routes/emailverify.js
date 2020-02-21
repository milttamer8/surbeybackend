var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log('send email start');
    var contact = req.body;
    console.log('content', contact);
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        // port: 465,
        port: 587,
        // secure: true, // use SSL
        secure: false, // use TLS
        auth: {
            user: 'milttamer8@gmail.com',
            pass: '913Pu2RzqwZ94EsCb'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var myname = contact.myname;
    var myemail = contact.myemail;
    var mysubject = contact.mysubject;
    var mymessage = contact.mymessage;
    var myphonenumber = contact.myphonenumber;

    const mailOptions = {
        from: myemail, // sender address
        to: 'threathaus123@gmail.com', // list of receivers
        subject: 'Hello, TheatHaus, Contact Me', // Subject line
        html: '<h3><font color="red">First Name</font>:' + myname + '<br />' +
            '<font color="red">Business Email</font>:' + myemail + '<br />' +
            '<font color="red">Phone Number</font>:' + myphonenumber + '</h3>' +
            '<font color="red">Company Name</font>:' + mysubject + '<br />' +
            '<font color="red">Job Title</font>:' + mymessage + '<br />'
            // plain text body
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err),
            res.status(203).send({ message: 'submit failed' });

        else
            console.log(info),
            res.status(203).send({ message: 'submit success' });
    });
});

module.exports = router;