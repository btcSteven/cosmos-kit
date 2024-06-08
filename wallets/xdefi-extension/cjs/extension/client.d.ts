import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { BroadcastMode, SignType } from '@cosmos-kit/core';
import { DirectSignDoc, SignOptions, WalletClient } from '@cosmos-kit/core';
import { XDEFI } from './types';
export declare class XDEFIClient implements WalletClient {
    readonly client: XDEFI;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: XDEFI);
    enable(chainIds: string | string[]): Promise<void>;
    disconnect(): Promise<void>;
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
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<AminoSignResponse>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<DirectSignResponse>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode): Promise<Uint8Array>;
}
