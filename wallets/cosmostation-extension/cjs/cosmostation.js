"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const cosmostationExtension = new extension_1.CosmostationExtensionWallet(extension_1.cosmostationExtensionInfo);
exports.wallets = [cosmostationExtension];
