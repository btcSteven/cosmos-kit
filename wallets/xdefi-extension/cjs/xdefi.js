"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const xdefiExtension = new extension_1.XDEFIExtensionWallet(extension_1.xdefiExtensionInfo);
exports.wallets = [xdefiExtension];
