"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin98ExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class Coin98ExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainCoin98Extension);
        this.preferredEndpoints = preferredEndpoints;
    }
    async initClient() {
        this.initingClient();
        try {
            const coin98 = await (0, utils_1.getCoin98FromExtension)();
            this.initClientDone(coin98 ? new client_1.Coin98Client(coin98) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.Coin98ExtensionWallet = Coin98ExtensionWallet;
