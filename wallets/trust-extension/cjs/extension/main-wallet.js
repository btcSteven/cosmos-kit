"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class TrustExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainTrustExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const trust = await (0, utils_1.getTrustFromExtension)();
            this.initClientDone(trust ? new client_1.TrustClient(trust) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.TrustExtensionWallet = TrustExtensionWallet;
