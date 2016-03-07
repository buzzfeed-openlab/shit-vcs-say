var pgp = require('pg-promise')(),
    dbconfig = require('./config.json');

if (process.env.RDS_HOSTNAME) {
    dbconfig.host = process.env.RDS_HOSTNAME;
    dbconfig.user = process.env.RDS_USERNAME;
    dbconfig.password = process.env.RDS_PASSWORD;
    dbconfig.port = process.env.RDS_PORT;
}

module.exports = pgp(dbconfig);
