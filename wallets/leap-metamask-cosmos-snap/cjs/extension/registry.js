"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metamaskCosmosSnapInfo = void 0;
const constant_1 = require("../constant");
exports.metamaskCosmosSnapInfo = {
    name: 'leap-metamask-cosmos-snap',
    description: 'The Leap Cosmos MetaMask Snap allows signing of Cosmos transactions using MetaMask.',
    prettyName: 'Leap Cosmos MetaMask',
    logo: { major: constant_1.METAMASK_LOGO, minor: constant_1.LEAP_LOGO },
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
