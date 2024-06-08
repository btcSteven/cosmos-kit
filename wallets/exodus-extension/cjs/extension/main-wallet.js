"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExodusExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class ExodusExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainExodusExtension);
        this.preferredEndpoints = preferredEndpoints;
    }
    async initClient() {
        this.initingClient();
        try {
            const exodus = await (0, utils_1.getExodusFromExtension)();
            if (!exodus?.cosmos) {
                throw new Error('Exodus client does not support Cosmos provider');
            }
            this.initClientDone(exodus ? new client_1.ExodusClient(exodus.cosmos) : undefined);
        }
        catch (error) {
            this.logger?.error(error);
            this.initClientError(error);
        }
    }
}
exports.ExodusExtensionWallet = ExodusExtensionWallet;
