"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetamaskCosmosSnapWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class MetamaskCosmosSnapWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainMetamaskCosmosSnap);
    }
    async initClient() {
        this.initingClient();
        try {
            const installed = await (0, utils_1.isMetamaskInstalled)();
            this.initClientDone(installed ? new client_1.CosmosSnapClient() : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.MetamaskCosmosSnapWallet = MetamaskCosmosSnapWallet;
