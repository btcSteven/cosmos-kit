import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { BroadcastMode, ChainRecord, DirectSignDoc, SignOptions, SignType, SuggestToken, WalletClient } from '@cosmos-kit/core';
import { Cosmostation } from './types';
import { DirectSignResponse } from '@cosmjs/proto-signing';
export declare class CosmostationClient implements WalletClient {
    readonly client: Cosmostation;
    private eventMap;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: Cosmostation);
    get cosmos(): import("./types").Cosmos;
    get ikeplr(): Keplr;
    suggestToken({ chainName, tokens, type }: SuggestToken): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: string;
        username: string;
    }>;
    getAccount(chainId: string): Promise<{
        username: string;
        address: string;
        pubkey: Uint8Array;
        algo: Algo;
    }>;
    disconnect(): Promise<void>;
    on(type: string, listener: EventListenerOrEventListenerObject): void;
    off(type: string, listener: EventListenerOrEventListenerObject): void;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): any;
    getOfflineSignerAmino(chainId: string): any;
    getOfflineSignerDirect(chainId: string): {
        getAccounts: () => Promise<{
            username: string;
            address: string;
            pubkey: Uint8Array;
            algo: Algo;
        }[]>;
        signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
    };
    addChain(chainInfo: ChainRecord): Promise<void>;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<any>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<DirectSignResponse>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode): Promise<any>;
}
