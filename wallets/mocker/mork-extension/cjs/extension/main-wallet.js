"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeapExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class LeapExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainLeapExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const leap = await (0, utils_1.getLeapFromExtension)();
            this.initClientDone(leap ? new client_1.LeapClient(leap) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.LeapExtensionWallet = LeapExtensionWallet;
