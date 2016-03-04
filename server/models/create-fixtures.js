
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
            "'[{\"name\":\"Marc Andreessen\",\"handle\":\"pmarca\",\"image\":\"pmarca-1.jpg\",\"link\":\"http://twitter.com/pmarca\",\"isAuthor\":true,\"chosenText\":\"lol, yea...\"},{\"name\":\"Big Bird\",\"handle\":\"BigBird\",\"image\":\"bigbird-1.png\",\"link\":\"http://twitter.com/bigbird\",\"chosenText\":\"Big Bird would never be racist!\"},{\"name\":\"Benedict Evans\",\"handle\":\"BenedictEvans\",\"image\":\"benedictevans-1.jpeg\",\"link\":\"http://twitter.com/BenedictEvans\",\"chosenText\":\"Na, it was not Benedict Evans, but who can keep track of all these white guys anyway...\"}]'" +
            "),(" +
            "'06f9bff5-c51e-4087-ab88-djdjdjdjdj'," +
            "'The world has never been more peaceful, more wealthy, more equal, with more jobs, more education, or more opportunity. The future is bright.'," +
            "'https://twitter.com/pmarca/status/652692676752465921'," +
            "'{\"text\": \"#ShitVCsSay \",\"link\": \"https://twitter.com/pmarca/status/652692676752465921\"}'," +
            "'[{\"name\":\"Elmo\",\"handle\":\"Elmo\",\"image\":\"elmo-1.png\",\"link\":\"http://twitter.com/elmo\",\"chosenText\":\"Elmo would never minimize other''s struggles in order to validate an economic system which keeps Elmo in power!\"},{\"name\":\"Jason Calacanis\",\"handle\":\"Jason\",\"image\":\"jason-1.jpg\",\"link\":\"http://twitter.com/jason\",\"chosenText\":\"Na, it was not Jason Calacanis, but who can keep track of all these white guys anyway...\"},{\"name\":\"Marc Andreessen\",\"handle\":\"pmarca\",\"image\":\"pmarca-1.jpg\",\"link\":\"http://twitter.com/pmarca\",\"isAuthor\":true}]'" +
            "),(" +
            "'06f9bff5-c51e-4087-ab88-2497bb7516c3'," +
            "'I actually own three tuxedos!'," +
            "'https://twitter.com/BigBird/status/623205331305279488'," +
            "'{\"text\":\"#ShitVCsSay \",\"link\":\"https://twitter.com/BigBird/status/623205331305279488\"}'," +
            "'[{\"name\":\"John Lilly\",\"handle\":\"johnolilly\",\"image\":\"johnolilly-1.jpeg\",\"link\":\"http://twitter.com/johnolilly\",\"chosenText\":\"Na, it was not John Lilly, but who can keep track of all these white guys anyway...\"},{\"name\":\"Big Bird\",\"handle\":\"BigBird\",\"image\":\"bigbird-1.png\",\"link\":\"https://twitter.com/bigbird\",\"isAuthor\":true},{\"name\":\"Benedict Evans\",\"handle\":\"BenedictEvans\",\"image\":\"benedictevans-1.jpeg\",\"link\":\"https://twitter.com/benedictevans\",\"chosenText\":\"Na, it was not Benedict Evans, but who can keep track of all these white guys anyway...\"}]'" +
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
