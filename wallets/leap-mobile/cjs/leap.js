"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const wallet_connect_1 = require("./wallet-connect");
const leapMobile = new wallet_connect_1.LeapMobileWallet(wallet_connect_1.LeapMobileInfo);
exports.wallets = [leapMobile];
