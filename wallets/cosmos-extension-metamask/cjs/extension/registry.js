"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cosmosSnapExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.cosmosSnapExtensionInfo = {
    name: 'cosmos-extension-metamask',
    description: 'The Official Cosmos Extension for MetaMask allowing full use of MetaMask within the Cosmos.',
    prettyName: 'Cosmos MetaMask Extension',
    logo: constant_1.ICON,
    mode: 'extension',
    extends: 'MetaMask',
    mobileDisabled: () => !('ethereum' in window),
    rejectMessage: {
        source: 'Request rejected',
    },
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
        },
        {
            link: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
        },
    ],
};
