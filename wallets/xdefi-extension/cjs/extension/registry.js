"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xdefiExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.xdefiExtensionInfo = {
    name: 'xdefi-extension',
    prettyName: 'XDEFI',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: true,
    rejectMessage: {
        source: 'Request rejected',
    },
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
        },
        {
            link: 'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
        },
    ],
};
