"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const okxwalletExtension = new extension_1.OkxwalletExtensionWallet(extension_1.OkxwalletExtensionInfo);
exports.wallets = [okxwalletExtension];
