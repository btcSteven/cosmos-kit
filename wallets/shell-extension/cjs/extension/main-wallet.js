"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class ShellExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainShellExtension);
        this.preferredEndpoints = preferredEndpoints;
    }
    async initClient() {
        this.initingClient();
        try {
            const shell = await (0, utils_1.getShellFromExtension)();
            this.initClientDone(shell ? new client_1.ShellClient(shell) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.ShellExtensionWallet = ShellExtensionWallet;
