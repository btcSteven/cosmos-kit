"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin98ExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.Coin98ExtensionInfo = {
    name: 'coin98-extension',
    prettyName: 'Coin98',
    logo: constant_1.ICON,
    mode: 'extension',
    //Enable for dapp browser
    mobileDisabled: false,
    rejectMessage: {
        source: 'Request rejected',
    },
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/aeachknmefphepccionboohckonoeemg',
        },
        {
            link: 'https://coin98.com/wallet',
        },
    ],
};
