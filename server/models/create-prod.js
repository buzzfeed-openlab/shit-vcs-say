
var db = require('./db.js');

function fixtureQueries(i) {
    var queries = [
        "drop table if exists questions;",
        "create table questions(" +
            "id text not null," +
            "text text not null," +
            "link text," +
            "twitterShare json," +
            "options json" +
            ");"
    ];

    console.log(queries[i]);
    return i < queries.length ? this.query(queries[i]) : undefined;
}


var questions = [
    {
        id: '1cb02252-80c2-4888-90d1-f68125c1fd17',
        text: 'From "only nerds will use the Internet" to "everyone stares at their smartphones all day long!" in 20 years. Not bad, team :-).',
        link: 'https://twitter.com/pmarca/status/556161530455023617',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/pmarca/status/556161530455023617'
        },
        options: [
            {
                "name": "Marc Andreessen",
                "handle": "pmarca",
                "image": "pmarca.jpg",
                "link": "http://twitter.com/pmarca",
                "isAuthor": true
            }
        ]
    },
    {
        id: '350c750b-6610-417d-a741-59b81d61e0af',
        text: 'A thing I believe that few believe: Almost all Silicon Valley startup ideas from qualified founders = great ideas. But some are too early.',
        link: 'https://twitter.com/pmarca/status/502474167766114304',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/pmarca/status/502474167766114304'
        },
        options: [
            {
                "name": "Marc Andreessen",
                "handle": "pmarca",
                "image": "pmarca.jpg",
                "link": "http://twitter.com/pmarca",
                "isAuthor": true
            }
        ]
    },
    {
        id: 'b312141a-f1c8-41f9-8ff6-b5c8d9a9456f',
        text: 'The world has never been more peaceful, more wealthy, more equal, with more jobs, more education, or more opportunity. The future is bright.',
        link: 'https://twitter.com/pmarca/status/652692676752465921',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/pmarca/status/652692676752465921'
        },
        options: [
            {
                "name": "Marc Andreessen",
                "handle": "pmarca",
                "image": "pmarca.jpg",
                "link": "http://twitter.com/pmarca",
                "isAuthor": true
            }
        ]
    },
    {
        id: '54dc015a-0342-4df4-ab6c-7927a65cc7b3',
        text: 'Anti-colonialism has been economically catastrophic for the Indian people for decades. Why stop now?',
        link: 'http://www.bloomberg.com/news/articles/2016-02-10/marc-andreessen-pro-colonialism-tweet-riles-up-india-tech-world',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'http://www.bloomberg.com/news/articles/2016-02-10/marc-andreessen-pro-colonialism-tweet-riles-up-india-tech-world'
        },
        options: [
            {
                "name": "Marc Andreessen",
                "handle": "pmarca",
                "image": "pmarca.jpg",
                "link": "http://twitter.com/pmarca",
                "isAuthor": true
            }
        ]
    },

    // -------

    {
        id: '68c5af1f-cbe5-4715-bf99-d1f3e49e8fc9',
        text: 'You move to SF for tech and spend all your money on rent. Well, there’s nothing else here. Maybe I’ll crack and go run in circles',
        link: 'https://twitter.com/BenedictEvans/status/678813850821521408',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/BenedictEvans/status/678813850821521408'
        },
        options: [
            {
                "name": "Benedict Evans",
                "handle": "BenedictEvans",
                "image": "benedictevans.jpeg",
                "link": "http://twitter.com/BenedictEvans",
                "isAuthor": true
            }
        ]
    },
    
    {
        id: '12d104bb-aca7-4680-b6a7-ae72a5ad2aff',
        text: 'no normal user ever encounters DRM anymore, since we went to streaming. It became a total non-issue',
        link: 'https://twitter.com/benedictevans/status/679561849117880320',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/benedictevans/status/679561849117880320'
        },
        options: [
            {
                "name": "Benedict Evans",
                "handle": "BenedictEvans",
                "image": "benedictevans.jpeg",
                "link": "http://twitter.com/BenedictEvans",
                "isAuthor": true
            }
        ]
    },

    // -------

    {
        id: '7c2eb5bb-946a-42af-a6ad-fd773a24cff3',
        text: 'Most smart people I know have decided to just not discuss anything sensitive because of the internet lynchmob looking for any slight mistake',
        link: 'https://twitter.com/sama/status/610494268151431168',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/sama/status/610494268151431168'
        },
        options: [
            {
                "name": "Sam Altman",
                "handle": "sama",
                "image": "sama.jpg",
                "link": "http://twitter.com/sama",
                "isAuthor": true
            }
        ]
    },
    {
        id: 'c9c0bd0e-c6ba-4e24-b9be-2765e9302757',
        text: 'long-term thinking is a competitive advantage because almost no one does it',
        link: 'https://twitter.com/sama/status/588900061871996928',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/sama/status/588900061871996928'
        },
        options: [
            {
                "name": "Sam Altman",
                "handle": "sama",
                "image": "sama.jpg",
                "link": "http://twitter.com/sama",
                "isAuthor": true
            }
        ]
    },
    {
        id: '4b4ca552-4b44-4b17-9e7e-ee0f0c3620b4',
        text: 'from a founder i really respect: "the hardest thing for me to learn was that the market does not care about effort or struggle, only output"',
        link: 'https://twitter.com/sama/status/595346651109167104',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/sama/status/595346651109167104'
        },
        options: [
            {
                "name": "Sam Altman",
                "handle": "sama",
                "image": "sama.jpg",
                "link": "http://twitter.com/sama",
                "isAuthor": true
            }
        ]
    },

    // -------

    {
        id: 'b12e3be5-e4f6-4da6-bcc8-2d4ad4190dbd',
        text: 'Yes, we are hiring.',
        link: 'https://twitter.com/rabois/status/690341968912719873',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/rabois/status/690341968912719873'
        },
        options: [
            {
                "name": "Keith Rabois",
                "handle": "rabois",
                "image": "rabois.jpg",
                "link": "http://twitter.com/rabois",
                "isAuthor": true
            }
        ]
    },
    {
        id: 'f4ff7c10-9bd1-4859-8ba9-33d011b70483',
        text: 'First principle: The team you build is the company you build.',
        link: 'https://twitter.com/rabois/status/467111196907163649',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/rabois/status/467111196907163649'
        },
        options: [
            {
                "name": "Keith Rabois",
                "handle": "rabois",
                "image": "rabois.jpg",
                "link": "http://twitter.com/rabois",
                "isAuthor": true
            }
        ]
    },

    // -------

    {
        id: '7335a579-12eb-4408-9f83-b34943132381',
        text: 'So that\'s it. Two guys in ties on Sand Hill Road with "Need Funding" signs. Time to close shop, burn it all down.',
        link: 'https://twitter.com/johnolilly/status/512265149160636416',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/johnolilly/status/512265149160636416'
        },
        options: [
            {
                "name": "John Lilly",
                "handle": "johnolilly",
                "image": "johnolilly.jpeg",
                "link": "http://twitter.com/johnolilly",
                "isAuthor": true
            }
        ]
    },

    // -------

    {
        id: 'b71ba7de-d266-43d5-b979-d393524c36d9',
        text: 'If you want to break into tech journalism you only need to blog every day for three years. there isn\'t a race wall in tech.',
        link: 'https://twitter.com/Jason/status/298836215602491393',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/Jason/status/298836215602491393'
        },
        options: [
            {
                "name": "Jason Calacanis",
                "handle": "Jason",
                "image": "jason.jpg",
                "link": "http://twitter.com/jason",
                "isAuthor": true
            }
        ]
    },
    {
        id: '801a96ba-4a86-423e-9d27-2242e6eed995',
        text: 'you don\'t know my struggle from Brooklyn to the top.... You don\'t know 10% of it. I took mine!',
        link: 'https://twitter.com/Jason/status/298828605289549826',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/Jason/status/298828605289549826'
        },
        options: [
            {
                "name": "Jason Calacanis",
                "handle": "Jason",
                "image": "jason.jpg",
                "link": "http://twitter.com/jason",
                "isAuthor": true
            }
        ]
    },
    {
        id: '2737ed4e-72f3-46c2-afed-751f2eecc9d5',
        text: 'I can tell you the tech industry & tech media space are both largely post-race. Pure meritocracy... Page views rule.',
        link: 'https://twitter.com/Jason/status/298815259760799745',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/Jason/status/298815259760799745'
        },
        options: [
            {
                "name": "Jason Calacanis",
                "handle": "Jason",
                "image": "jason.jpg",
                "link": "http://twitter.com/jason",
                "isAuthor": true
            }
        ]
    },

    // -------

    {
        id: 'ea2a1778-155c-4d7f-8eca-856f968c6e90',
        text: 'My point is this. WE\'VE WON! After eons gays can now mostly feel free to be themselves, love whoever, with no stigma.',
        link: 'https://twitter.com/arrington/status/451981392339955712',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/arrington/status/451981392339955712'
        },
        options: [
            {
                "name": "Michael Arrington",
                "handle": "arrington",
                "image": "arrington.jpg",
                "link": "http://twitter.com/arrington",
                "isAuthor": true
            }
        ]
    },
    {
        id: '7ad15bd1-47dd-4f60-923c-36c38fff36d3',
        text: 'Star Wars was as good as I hoped. Better.',
        link: 'https://twitter.com/arrington/status/678446331547922432',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/arrington/status/678446331547922432'
        },
        options: [
            {
                "name": "Michael Arrington",
                "handle": "arrington",
                "image": "arrington.jpg",
                "link": "http://twitter.com/arrington",
                "isAuthor": true
            }
        ]
    },
    {
        id: 'cb1d8aff-947a-4d44-a20f-0b7d40f05ad1',
        text: 'Message to our interns "I need the person least likely to spit in my coffee to get me coffee on the way in."',
        link: 'https://twitter.com/arrington/status/647083727676293120',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/arrington/status/647083727676293120'
        },
        options: [
            {
                "name": "Michael Arrington",
                "handle": "arrington",
                "image": "arrington.jpg",
                "link": "http://twitter.com/arrington",
                "isAuthor": true
            }
        ]
    },

    // -------

    {
        id: '4ce668b1-ea1b-4547-aa64-3adff9eae85a',
        text: 'Mute stupidity, block malice. Works outside of Twitter too.',
        link: 'https://twitter.com/paulg/status/664144765974278144',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/paulg/status/664144765974278144'
        },
        options: [
            {
                "name": "Paul Graham",
                "handle": "paulg",
                "image": "paulg.jpg",
                "link": "http://twitter.com/paulg",
                "isAuthor": true
            }
        ]
    },

    // -------

    {
        id: '5ec3c38b-0f74-4905-a8ff-7c3e9f32a742',
        text: 'I actually own three tuxedos!',
        link: 'https://twitter.com/BigBird/status/623205331305279488',
        twitterShare: {
            text: '#ShitVCsSay ',
            link: 'https://twitter.com/BigBird/status/623205331305279488'
        },
        options: [
            {
                "name": "Big Bird",
                "handle": "BigBird",
                "image": "bigbird.png",
                "link": "http://twitter.com/BigBird",
                "isAuthor": true
            }
        ]
    },
];

db.tx(function (t) {
    return this.sequence(fixtureQueries);
})
.then(function () {
    console.log('wiped and recreated table');

    for (var i = 0; i < questions.length; ++i) {
        var q = questions[i];
        db.none("insert into questions (id, text, link, twitterShare, options) values(${id},${text},${link},${twitterShare:json},${options:json})", q)
        .then(function () {
            console.log('SUCCESS: ', q);
        })
        .catch(function (err) {
            console.log('ERROR: ', err);
        });
    }
})
.catch(function (error) {
    console.log(error);
});



// {
//     id: '',
//     text: '',
//     link: '',
//     twitterShare: {
//         text: '#ShitVCsSay ',
//         link: ''
//     },
//     options: [
//     ]
// },






// {
//     "name": "Elmo",
//     "handle": "Elmo",
//     "image": "elmo.png",
//     "link": "http://twitter.com/elmo",
//     "chosenText": "Elmo would never minimize other''s struggles in order to validate an economic system which keeps Elmo in power!"
// }

// {
//     "name": "Jason Calacanis",
//     "handle": "Jason",
//     "image": "jason.jpg",
//     "link": "http://twitter.com/jason",
//     "chosenText": "Na, it was not Jason Calacanis, but who can keep track of all these white guys anyway..."
// }

// {
//     "name": "Marc Andreessen",
//     "handle": "pmarca",
//     "image": "pmarca.jpg",
//     "link": "http://twitter.com/pmarca",
//     "isAuthor": true
// }
