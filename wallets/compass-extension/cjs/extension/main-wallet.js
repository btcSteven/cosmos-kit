"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompassExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class CompassExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainCompassExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const compass = await (0, utils_1.getCompassFromExtension)();
            this.initClientDone(compass ? new client_1.CompassClient(compass) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.CompassExtensionWallet = CompassExtensionWallet;
