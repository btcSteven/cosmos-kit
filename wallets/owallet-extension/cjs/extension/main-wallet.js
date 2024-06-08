"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwalletExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class OwalletExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainOwalletExtension);
        this.preferredEndpoints = preferredEndpoints;
    }
    async initClient() {
        this.initingClient();
        try {
            const owallet = await (0, utils_1.getOWalletFromExtension)();
            this.initClientDone(owallet ? new client_1.OwalletClient(owallet) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.OwalletExtensionWallet = OwalletExtensionWallet;
