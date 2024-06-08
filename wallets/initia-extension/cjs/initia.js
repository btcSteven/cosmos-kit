"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const initiaExtension = new extension_1.InitiaExtensionWallet(extension_1.initiaExtensionInfo);
exports.wallets = [initiaExtension];
