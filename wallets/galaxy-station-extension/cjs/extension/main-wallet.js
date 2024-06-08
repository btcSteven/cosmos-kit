"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalaxyStationExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class GalaxyStationExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainStationExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const galaxystation = await (0, utils_1.getGalaxyStationFromExtension)();
            this.initClientDone(galaxystation ? new client_1.GalaxyStationClient(galaxystation) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.GalaxyStationExtensionWallet = GalaxyStationExtensionWallet;
