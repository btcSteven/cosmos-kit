"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vectisExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.vectisExtensionInfo = {
    name: 'vectis-extension',
    prettyName: 'Vectis',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: true,
    rejectMessage: {
        source: "The requested action couldn't be completed, it was rejected by the user.",
    },
    connectEventNamesOnWindow: ['vectis_accountChanged'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/vectis-wallet/cgkaddoglojnmfiblgmlinfaijcdpfjm',
        },
    ],
};
