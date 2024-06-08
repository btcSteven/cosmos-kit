"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compassExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.compassExtensionInfo = {
    name: 'compass-extension',
    prettyName: 'Compass',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: true,
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['compass_keystorechange'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/compass-wallet/anokgmphncpekkhclmingpimjmcooifb',
        },
        {
            link: 'https://chrome.google.com/webstore/detail/compass-wallet/anokgmphncpekkhclmingpimjmcooifb',
        },
    ],
};
