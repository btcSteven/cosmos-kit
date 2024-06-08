import { MainWalletBase } from '@cosmos-kit/core';
import { ChainCosmjsExtension } from './chain-wallet';
import { CosmjsClient } from './client';
import { getCosmjsFromExtension } from './utils';
export class CosmjsExtensionWallet extends MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, ChainCosmjsExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const cosmjs = await getCosmjsFromExtension();
            this.initClientDone(cosmjs ? new CosmjsClient(cosmjs) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
