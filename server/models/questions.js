
module.exports = function() {
    this.getTopQuestions = function (req, res, next) {
        console.log('db: ', db);
        req.questions = [];
        return next();
    }

    return this;    
}();
