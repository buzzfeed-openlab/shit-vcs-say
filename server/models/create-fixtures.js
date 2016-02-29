
var db = require('./db.js');

function fixtureQueries(i) {
    console.log('selecting: ', i);
    var queries = [
        "drop table if exists questions;",
        "create table questions(" +
            "id text not null," +
            "text text not null," +
            "link text," +
            "twitterShare json," +
            "options json" +
            ");",
        "insert into questions (id, text, link, twitterShare, options) values (" +
            "'06f9bff5-c51e-4087-ab88-1234567'," +
            "'Anti-colonialism has been economically catastrophic for the Indian people for decades. Why stop now?'," +
            "'http://www.bloomberg.com/news/articles/2016-02-10/marc-andreessen-pro-colonialism-tweet-riles-up-india-tech-world'," +
            "'{\"text\":\"#ShitVCsSay \",\"link\":\"http://www.bloomberg.com/news/articles/2016-02-10/marc-andreessen-pro-colonialism-tweet-riles-up-india-tech-world\"}'," +
            "'[{\"name\":\"Marc Andreessen\",\"handle\":\"pmarca\",\"image\":\"http://localhost:3000/images/pmarca-1.jpg\",\"link\":\"http://twitter.com/pmarca\",\"isAuthor\":true,\"chosenText\":\"lol, yea...\"},{\"name\":\"Big Bird\",\"handle\":\"BigBird\",\"image\":\"http://localhost:3000/images/bigbird-1.png\",\"link\":\"http://twitter.com/bigbird\",\"chosenText\":\"Big Bird would never be racist!\"},{\"name\":\"Benedict Evans\",\"handle\":\"BenedictEvans\",\"image\":\"http://localhost:3000/images/benedictevans-1.jpeg\",\"link\":\"http://twitter.com/BenedictEvans\",\"chosenText\":\"Na, it wasnt Benedict Evans, but who can keep track of all these white guys anyway...\"}]'" +
            ");"
    ];

    console.log(queries[i]);
    return i < queries.length ? this.query(queries[i]) : undefined;
}

db.tx(function (t) {
    return this.sequence(fixtureQueries);
})
.then(function (data) {
    console.log(data);
})
.catch(function (error) {
    console.log(error);
});
