"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cosmjsExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.cosmjsExtensionInfo = {
    name: 'cosmjs-extension',
    prettyName: 'Cosmjs',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: () => !('cosmjs' in window || /CosmjsCosmos/i.test(navigator.userAgent)),
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['cosmjs_keystorechange'],
};
