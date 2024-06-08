"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const ninjiExtension = new extension_1.NinjiExtensionWallet(extension_1.ninjiExtensionInfo);
exports.wallets = [ninjiExtension];
