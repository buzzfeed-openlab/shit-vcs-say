
'use strict';

import React, {
    NetInfo,
} from 'react-native';

import RNFS from 'react-native-fs';
import ZipArchive from 'react-native-zip-archive';

import Constants from './constants.js';

class API {
    static getTopQuestions(cb) {
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (!isConnected) {
                return cb('not connected');
            }

            fetch(Constants.API_PATH + '/api/questions')
            .then((response) => { return response.json(); })
            .then((json) => { cb(null, json); })
            .catch((err) => {
                cb(err);
            });
        });
    }

    static downloadImageBundle(cb) {
        RNFS.downloadFile(Constants.API_PATH + '/images/imagebundle.zip', RNFS.DocumentDirectoryPath + '/images.zip')
        .then(() => {
            RNFS.mkdir(Constants.IMAGE_DIR, true)
            .then(() => {
                ZipArchive.unzip(RNFS.DocumentDirectoryPath + '/images.zip', Constants.IMAGE_DIR)
                .then(() => {
                    cb(null, Constants.IMAGE_DIR);
                })
                .catch((err) => {
                    cb(err);
                });
            })
            .catch((err) => {
                cb(err);
            });
        })
        .catch((err) => {
            cb(err);
        })
    }
}

export default API;
