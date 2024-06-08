"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const wallet_connect_1 = require("./wallet-connect");
const cosmostationMobile = new wallet_connect_1.CosmostationMobileWallet(wallet_connect_1.cosmostationMobileInfo);
exports.wallets = [cosmostationMobile];
