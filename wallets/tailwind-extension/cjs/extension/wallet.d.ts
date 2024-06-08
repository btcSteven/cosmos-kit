import { OfflineSigner } from '@cosmjs/proto-signing';
import { ChainRecord, ChainWalletBase, MainWalletBase, SimpleAccount, Wallet, WalletAccount, WalletClient } from '@cosmos-kit/core';
import { TailwindWallet } from '@tailwindzone/connect';
/**
 * Keplr and leap both leave this interface empty.
 * Used in TailwindExtensionWallet's instantiation.
 */
export declare class ChainTailwindExtension extends ChainWalletBase {
    constructor(walletInfo: Wallet, chainInfo: ChainRecord);
}
export declare class TailwindClient implements WalletClient {
    private tailwind;
    constructor(tailwind: TailwindWallet);
    getAccount(chainId: string): Promise<WalletAccount>;
    getSimpleAccount(chainId: string): Promise<SimpleAccount>;
    getOfflineSigner(chainId: string): Promise<OfflineSigner>;
}
export declare class TailwindExtensionWallet extends MainWalletBase {
    constructor(wallet_info: Wallet);
    initClient(): Promise<void>;
}
