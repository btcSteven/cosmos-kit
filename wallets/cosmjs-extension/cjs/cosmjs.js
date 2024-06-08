"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const cosmjsExtension = new extension_1.CosmjsExtensionWallet(extension_1.cosmjsExtensionInfo);
exports.wallets = [cosmjsExtension];
