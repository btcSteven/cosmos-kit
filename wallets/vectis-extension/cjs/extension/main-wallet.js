"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectisExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class VectisExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainVectisExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const vectis = await (0, utils_1.getVectisFromExtension)();
            this.initClientDone(vectis ? new client_1.VectisClient(vectis) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.VectisExtensionWallet = VectisExtensionWallet;
