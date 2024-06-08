import { SignType, WalletClient } from '@cosmos-kit/core';
import { Trust } from './types';
export declare class TrustClient implements WalletClient {
    readonly client: Trust;
    constructor(client: Trust);
    enable(chainIds: string | string[]): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: any;
        username: any;
    }>;
    getAccount(chainId: string): Promise<{
        username: any;
        address: any;
        algo: Algo;
        pubkey: any;
    }>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): any;
}
