"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeapMobileWallet = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
class LeapMobileWallet extends walletconnect_1.WCWallet {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainLeapMobile, client_1.LeapClient);
        this.preferredEndpoints = preferredEndpoints;
    }
}
exports.LeapMobileWallet = LeapMobileWallet;
