
'use strict';

import React, {
    NetInfo,
} from 'react-native';

import RNFS from 'react-native-fs';
import FileDownload from 'react-native-file-download';
import ZipArchive from 'react-native-zip-archive';

const API_PATH = 'http://localhost:3000';
const IMAGE_DIR = RNFS.DocumentDirectoryPath + '/images/';

class API {
    static getTopQuestions(cb) {
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (!isConnected) {
                return cb('not connected');
            }

            fetch(API_PATH + '/api/questions')
            .then((response) => { return response.json(); })
            .then((json) => { cb(null, json); })
            .catch((err) => {
                cb(err);
            });
        });
    }

    static downloadImageBundle(cb) {
        FileDownload.download(API_PATH + '/images/imagebundle.zip', IMAGE_DIR)
        .then((path) => {
            ZipArchive.unzip(path, IMAGE_DIR)
            .then(() => {
                cb(null, IMAGE_DIR);
            })
            .catch((err) => {
                cb(err);
            });
        })
        .catch((err) => {
          cb(err);
        });
    }
}

export default API;