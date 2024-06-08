"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const client_1 = require("./client");
const utils_1 = require("./utils");
const chain_wallet_1 = require("./chain-wallet");
class FinExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainFinExtension);
        this.preferredEndpoints = preferredEndpoints;
    }
    async initClient() {
        this.initingClient();
        try {
            const fin = await (0, utils_1.getFinFromExtension)();
            this.initClientDone(fin ? new client_1.FinClient(fin) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.FinExtensionWallet = FinExtensionWallet;
