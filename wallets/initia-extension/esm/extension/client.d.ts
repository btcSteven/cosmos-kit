import { DirectSignDoc, SignOptions, WalletAccount, WalletClient } from '@cosmos-kit/core';
import { InitiaWallet } from './type';
export declare class InitiaClient implements WalletClient {
    readonly client: InitiaWallet;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: InitiaWallet);
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: string;
    }>;
    getOfflineSigner(chainId: string): OfflineDirectSigner;
    getAccount(chainId: string): Promise<WalletAccount>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc): Promise<any>;
}
