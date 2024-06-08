import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { BroadcastMode, ChainRecord, DirectSignDoc, SignOptions, SignType, WalletClient } from '@cosmos-kit/core';
import { Coin98 } from './types';
export declare class Coin98Client implements WalletClient {
    readonly client: Coin98;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: Coin98);
    enable(chainIds: string | string[]): Promise<void>;
    connect(chainIds: string | string[]): Promise<void>;
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
    getOfflineSignerAmino(chainId: string): any;
    getOfflineSignerDirect(chainId: string): {
        getAccounts: () => Promise<{
            username: any;
            address: any;
            algo: Algo;
            pubkey: any;
        }[]>;
        signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<any>;
    };
    addChain(chainInfo: ChainRecord): Promise<void>;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<any>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<any>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode): Promise<any>;
}
