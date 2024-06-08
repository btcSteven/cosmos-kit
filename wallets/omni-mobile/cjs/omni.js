"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const config_1 = require("./config");
const wallet_connect_1 = require("./wallet-connect");
const omniMobile = new wallet_connect_1.OmniMobileWallet(wallet_connect_1.omniMobileInfo, config_1.preferredEndpoints);
exports.wallets = [omniMobile];
