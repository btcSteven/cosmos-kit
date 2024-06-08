import { MainWalletBase } from '@cosmos-kit/core';
import { LedgerChianWallet } from './chain-wallet';
import { LedgerClient } from './client';
export class LedgerMainWallet extends MainWalletBase {
    transportType;
    constructor(walletInfo, preferredEndpoints, transportType = 'WebUSB') {
        super(walletInfo, LedgerChianWallet);
        this.preferredEndpoints = preferredEndpoints;
        this.transportType = transportType;
    }
    async initClient() {
        this.initingClient();
        try {
            this.initClientDone(new LedgerClient());
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
