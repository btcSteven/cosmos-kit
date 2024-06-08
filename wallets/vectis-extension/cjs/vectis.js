"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const vectisExtension = new extension_1.VectisExtensionWallet(extension_1.vectisExtensionInfo);
exports.wallets = [vectisExtension];
