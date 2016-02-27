
'use strict';

import React, {
    NetInfo,
} from 'react-native';

class API {
    static getTopQuestions(cb) {
        NetInfo.isConnected.fetch().done((isConnected) => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));

            if (!isConnected) {
                return cb('not connected');
            }

            fetch('http://localhost:3000/api/questions')
            .then((response) => { return response.json(); })
            .then((json) => { cb(null, json); })
            .catch((err) => {
                cb(err);
            });
        });
    }


}

export default API;