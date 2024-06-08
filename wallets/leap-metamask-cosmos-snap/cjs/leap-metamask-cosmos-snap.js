"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const metamaskCosmosSnap = new extension_1.MetamaskCosmosSnapWallet(extension_1.metamaskCosmosSnapInfo);
exports.wallets = [metamaskCosmosSnap];
