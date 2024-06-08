"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.shellExtensionInfo = {
    name: 'shell-extension',
    prettyName: 'Shell',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: true,
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['shell_keystorechange'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/shell-wallet/kbdcddcmgoplfockflacnnefaehaiocb',
        },
    ],
};
