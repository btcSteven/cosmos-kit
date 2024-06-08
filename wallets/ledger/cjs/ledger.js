"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = exports.ledgerUSB = void 0;
const web_usb_hid_1 = require("./web-usb-hid");
// export const ledgerHID = new LedgerMainWallet(LedgerInfo, undefined, 'WebHID');
exports.ledgerUSB = new web_usb_hid_1.LedgerMainWallet(web_usb_hid_1.LedgerInfo, undefined, 'WebUSB');
exports.wallets = [exports.ledgerUSB];
