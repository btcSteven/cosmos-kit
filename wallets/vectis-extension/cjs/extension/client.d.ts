import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { BroadcastMode, ChainRecord, DirectSignDoc, SignOptions, SignType, WalletClient } from '@cosmos-kit/core';
import type { Vectis } from './types';
export declare class VectisClient implements WalletClient {
    readonly client: Vectis;
    constructor(client: Vectis);
    enable(chainIds: string | string[]): Promise<void>;
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
        isNanoLedger: boolean;
        isSmartContract: boolean;
    }>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): Promise<any>;
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
    addChain({ chain, name, assetList, preferredEndpoints }: ChainRecord): Promise<void>;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<AminoSignResponse>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<DirectSignResponse>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode): Promise<Uint8Array>;
}
