"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leapExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.leapExtensionInfo = {
    name: 'leap-extension',
    prettyName: 'Leap',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: () => !('leap' in window || /LeapCosmos/i.test(navigator.userAgent)),
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['leap_keystorechange'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/leap-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg',
        },
        {
            link: 'https://chrome.google.com/webstore/detail/leap-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg',
        },
    ],
};
