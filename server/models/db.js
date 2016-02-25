var pgp = require('pg-promise')(),
    dbconfig = require('./config.json');

module.exports = pgp(dbconfig);
