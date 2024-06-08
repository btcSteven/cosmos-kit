import { MainWalletBase } from '@cosmos-kit/core';
import { ChainStationExtension } from './chain-wallet';
import { StationClient } from './client';
import { getStationFromExtension } from './utils';
export class StationExtensionWallet extends MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, ChainStationExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const terra = await getStationFromExtension();
            this.initClientDone(terra ? new StationClient(terra) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
