"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustMobileWallet = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
class TrustMobileWallet extends walletconnect_1.WCWallet {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainTrustMobile, client_1.TrustClient);
        this.preferredEndpoints = preferredEndpoints;
    }
}
exports.TrustMobileWallet = TrustMobileWallet;
