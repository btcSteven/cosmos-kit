"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontierExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class FrontierExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainFrontierExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const frontier = await (0, utils_1.getFrontierFromExtension)();
            this.initClientDone(frontier ? new client_1.FrontierClient(frontier) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.FrontierExtensionWallet = FrontierExtensionWallet;
