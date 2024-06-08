"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const leapExtension = new extension_1.LeapExtensionWallet(extension_1.leapExtensionInfo);
exports.wallets = [leapExtension];
