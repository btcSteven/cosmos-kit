import { StdSignDoc } from '@cosmjs/amino';
import { WalletClient } from '@cosmos-kit/core';
import Cosmos from '@ledgerhq/hw-app-cosmos';
export declare class LedgerClient implements WalletClient {
    client: Cosmos;
    constructor(client?: Cosmos);
    initClient(): Promise<void>;
    getSimpleAccount(chainId: string, accountIndex?: number): Promise<{
        namespace: string;
        chainId: string;
        address: any;
        username: string;
    }>;
    getAccount(chainId: string, accountIndex?: number, username?: string): Promise<{
        username: string;
        address: any;
        algo: Algo;
        pubkey: Uint8Array;
        isNanoLedger: boolean;
    }>;
    sign(signDoc: StdSignDoc, accountIndex?: number): Promise<any>;
}
