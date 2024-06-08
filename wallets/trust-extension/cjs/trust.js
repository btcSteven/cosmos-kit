"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const trustExtension = new extension_1.TrustExtensionWallet(extension_1.trustExtensionInfo);
exports.wallets = [trustExtension];
