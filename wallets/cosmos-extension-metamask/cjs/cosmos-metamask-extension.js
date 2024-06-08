"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const cosmosExtensionMetamaskExtension = new extension_1.CosmosMetamaskExtensionWallet(extension_1.cosmosSnapExtensionInfo);
exports.wallets = [cosmosExtensionMetamaskExtension];
