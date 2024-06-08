"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OkxwalletExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.OkxwalletExtensionInfo = {
    name: 'okxwallet-extension',
    prettyName: 'OKX Wallet',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: true,
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['okxwallet_keystorechange'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge',
        },
        {
            device: 'desktop',
            browser: 'firefox',
            link: 'https://addons.mozilla.org/zh-CN/firefox/addon/okexwallet/',
        },
        {
            link: 'https://www.okx.com/download',
        },
    ],
};
