"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosMetamaskExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
class CosmosMetamaskExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainCosmosExtensionMetamaskSnap);
    }
    async initClient() {
        this.initingClient();
        try {
            this.initClientDone(new client_1.CosmosExtensionClient());
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.CosmosMetamaskExtensionWallet = CosmosMetamaskExtensionWallet;
