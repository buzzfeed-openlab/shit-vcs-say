var express = require('express'),
    router = express.Router(),
    aws = require('aws-sdk'),
    questions = require('../models/questions.js');

router.get('/', questions.getTopQuestions, function(req, res, next) {
    res.json(req.questions);
});

module.exports = router;
