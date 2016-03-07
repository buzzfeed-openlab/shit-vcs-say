
import React, {
    Dimensions,
} from 'react-native';

import RNFS from 'react-native-fs';


const dims = Dimensions.get('window');
const smallPhone = Math.min(dims.height, dims.width) < 375;

const fontSizeSmall = 12;
const fontSizeMedium = smallPhone ? 14 : 16;
const fontSizeLarge = smallPhone ? 18 : 20;
const profileSize = smallPhone ? 40 : 64;
const buffer = smallPhone ? 10 : 20;

const Constants = {
    API_PATH: 'http://svs-env.us-east-1.elasticbeanstalk.com',
    IMAGE_DIR: RNFS.DocumentDirectoryPath + '/images/',
    FONT_SIZE_LARGE: fontSizeLarge,
    FONT_SIZE_MEDIUM: fontSizeMedium,
    FONT_SIZE_SMALL: fontSizeSmall,
    PROFILE_SIZE: profileSize,
    BUFFER: buffer,
}

export default Constants;
