"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmniMobileWallet = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
class OmniMobileWallet extends walletconnect_1.WCWallet {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainOmniMobile, client_1.OmniClient);
        this.preferredEndpoints = preferredEndpoints;
    }
}
exports.OmniMobileWallet = OmniMobileWallet;
