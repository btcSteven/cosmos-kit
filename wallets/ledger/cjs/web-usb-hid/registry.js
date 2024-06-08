"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerInfo = void 0;
const constant_1 = require("../constant");
exports.LedgerInfo = {
    name: 'ledger-web-usb-hid',
    prettyName: 'Ledger',
    logo: constant_1.ICON,
    mode: 'ledger',
    mobileDisabled: true,
    rejectMessage: {
        source: 'Request rejected',
    },
};
