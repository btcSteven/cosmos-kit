import { Wallet } from '@cosmos-kit/core';
import { MainWalletBase } from '@cosmos-kit/core';
export declare class CosmjsExtensionWallet extends MainWalletBase {
    constructor(walletInfo: Wallet);
    initClient(): Promise<void>;
}
