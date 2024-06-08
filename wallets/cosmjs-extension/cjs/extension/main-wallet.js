"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmjsExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class CosmjsExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainCosmjsExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const cosmjs = await (0, utils_1.getCosmjsFromExtension)();
            this.initClientDone(cosmjs ? new client_1.CosmjsClient(cosmjs) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.CosmjsExtensionWallet = CosmjsExtensionWallet;
