
module.exports = function() {
    this.getTopQuestions = function (req, res, next) {
        db.any("select * from questions")
        .then(function(data) {
            req.questions = data;
            next();
        })
        .catch(function(err) {
            console.log('error: ', err);
        });
    }

    return this;    
}();
