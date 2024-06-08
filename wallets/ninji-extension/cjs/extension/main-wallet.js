"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NinjiExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class NinjiExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainNinjiExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const ninji = await (0, utils_1.getNinjiFromExtension)();
            this.initClientDone(ninji ? new client_1.NinjiClient(ninji) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.NinjiExtensionWallet = NinjiExtensionWallet;
