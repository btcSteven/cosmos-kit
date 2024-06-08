"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmostationExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class CosmostationExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainCosmostationExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const cosmostation = await (0, utils_1.getCosmostationFromExtension)();
            this.initClientDone(cosmostation ? new client_1.CosmostationClient(cosmostation) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.CosmostationExtensionWallet = CosmostationExtensionWallet;
