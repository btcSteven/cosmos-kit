"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const wallet_connect_1 = require("./wallet-connect");
const trustMobile = new wallet_connect_1.TrustMobileWallet(wallet_connect_1.trustMobileInfo);
exports.wallets = [trustMobile];
