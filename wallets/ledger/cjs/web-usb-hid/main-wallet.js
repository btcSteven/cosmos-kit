"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerMainWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
class LedgerMainWallet extends core_1.MainWalletBase {
    transportType;
    constructor(walletInfo, preferredEndpoints, transportType = 'WebUSB') {
        super(walletInfo, chain_wallet_1.LedgerChianWallet);
        this.preferredEndpoints = preferredEndpoints;
        this.transportType = transportType;
    }
    async initClient() {
        this.initingClient();
        try {
            this.initClientDone(new client_1.LedgerClient());
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.LedgerMainWallet = LedgerMainWallet;
