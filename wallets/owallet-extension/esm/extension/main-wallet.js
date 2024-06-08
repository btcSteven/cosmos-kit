import { MainWalletBase } from '@cosmos-kit/core';
import { ChainOwalletExtension } from './chain-wallet';
import { OwalletClient } from './client';
import { getOWalletFromExtension } from './utils';
export class OwalletExtensionWallet extends MainWalletBase {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, ChainOwalletExtension);
        this.preferredEndpoints = preferredEndpoints;
    }
    async initClient() {
        this.initingClient();
        try {
            const owallet = await getOWalletFromExtension();
            this.initClientDone(owallet ? new OwalletClient(owallet) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
