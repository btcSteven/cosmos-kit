"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ninjiExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.ninjiExtensionInfo = {
    name: 'ninji-extension',
    prettyName: 'Ninji',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: () => !('ninji' in window || /NinjiCosmos/i.test(navigator.userAgent)),
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['accountsChanged', 'networkChanged'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chromewebstore.google.com/detail/ninji-wallet/kkpllbgjhchghjapjbinnoddmciocphm',
        },
        {
            link: 'https://ninji.xyz/#download',
        },
    ],
};
