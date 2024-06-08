"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exodusExtensionInfo = void 0;
const go_1 = require("react-icons/go");
const ri_1 = require("react-icons/ri");
const constant_1 = require("../constant");
exports.exodusExtensionInfo = {
    name: 'exodus-extension',
    prettyName: 'Exodus',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: true,
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['exodus_keystorechange'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            icon: ri_1.RiChromeFill,
            link: 'https://chrome.google.com/webstore/detail/exodus-web3-wallet/aholpfdialjgjfhomihkjbmgjidlcdno',
        },
        {
            icon: go_1.GoDesktopDownload,
            link: 'https://www.exodus.com/download',
        },
    ],
};
