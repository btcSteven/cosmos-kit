"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trustExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.trustExtensionInfo = {
    name: 'trust-extension',
    prettyName: 'Trust',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: true,
    rejectMessage: {
        source: 'Request rejected',
    },
    downloads: [
        {
            device: 'mobile',
            os: 'android',
            link: 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&referrer=utm_source%3Dwebsite',
        },
        {
            device: 'mobile',
            os: 'ios',
            link: 'https://apps.apple.com/app/apple-store/id1288339409?mt=8',
        },
    ],
};
