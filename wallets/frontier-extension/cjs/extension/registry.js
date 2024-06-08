"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontierExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.frontierExtensionInfo = {
    name: 'frontier-extension',
    prettyName: 'Frontier',
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
            link: 'https://chrome.google.com/webstore/detail/frontier-wallet/kppfdiipphfccemcignhifpjkapfbihd',
        },
        {
            link: 'https://chrome.google.com/webstore/detail/frontier-wallet/kppfdiipphfccemcignhifpjkapfbihd',
        },
    ],
};
