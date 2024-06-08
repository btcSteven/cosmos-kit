import { StdSignDoc } from '@cosmjs/amino';
import { BroadcastMode, ChainRecord, DirectSignDoc, SignOptions, SignType, WalletClient } from '@cosmos-kit/core';
import { Fin } from './types';
export declare class FinClient implements WalletClient {
    readonly client: Fin;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: Fin);
    enable(chainIds: string | string[]): Promise<void>;
    connect(chainIds: string | string[]): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: string;
        username: string;
    }>;
    getAccount(chainId: string): Promise<{
        username: string;
        address: string;
        algo: Algo;
        pubkey: Uint8Array;
    }>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): any;
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
    addChain(chainInfo: ChainRecord): Promise<void>;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<AminoSignResponse>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<DirectSignResponse>;
    sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode): Promise<Uint8Array>;
}
