"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitiaExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class InitiaExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainInitiaExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const initia = await (0, utils_1.getInitiaFromExtension)();
            this.initClientDone(initia ? new client_1.InitiaClient(initia) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.InitiaExtensionWallet = InitiaExtensionWallet;
