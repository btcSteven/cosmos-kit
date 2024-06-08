"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OkxwalletExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class OkxwalletExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainOkxwalletExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const okxwallet = await (0, utils_1.getOkxwalletFromExtension)();
            this.initClientDone(okxwallet ? new client_1.OkxwalletClient(okxwallet) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.OkxwalletExtensionWallet = OkxwalletExtensionWallet;
