"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmostationMobileWallet = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
class CosmostationMobileWallet extends walletconnect_1.WCWallet {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainCosmostationMobile, client_1.CosmostationClient);
        this.preferredEndpoints = preferredEndpoints;
    }
}
exports.CosmostationMobileWallet = CosmostationMobileWallet;
