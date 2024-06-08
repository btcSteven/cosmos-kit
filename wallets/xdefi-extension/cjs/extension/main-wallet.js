"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XDEFIExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class XDEFIExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainXDEFIExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const xdefi = await (0, utils_1.getXDEFIFromExtension)();
            this.initClientDone(xdefi ? new client_1.XDEFIClient(xdefi) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.XDEFIExtensionWallet = XDEFIExtensionWallet;
