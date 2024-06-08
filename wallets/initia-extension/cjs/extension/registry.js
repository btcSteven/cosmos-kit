"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiaExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.initiaExtensionInfo = {
    name: 'initia-extension',
    prettyName: 'Initia',
    logo: constant_1.ICON,
    mode: 'extension',
    // In the Initia Mobile in-app browser, Initia is available in window.initia,
    // similar to the extension on a desktop browser. For this reason, we must
    // check what mode the window.initia client is in once it's available.
    mobileDisabled: () => !('initia' in window),
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['initia_keystorechange'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chromewebstore.google.com/detail/initia-wallet/ffbceckpkpbcmgiaehlloocglmijnpmp',
        },
    ],
};
