import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { ChainRecord, DirectSignDoc, SignOptions, SignType, SuggestToken, WalletClient } from '@cosmos-kit/core';
import { BroadcastMode } from '@keplr-wallet/types';
import { Shell } from './types';
export declare class ShellClient implements WalletClient {
    readonly client: Shell;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: Shell);
    enable(chainIds: string | string[]): Promise<void>;
    suggestToken({ chainId, tokens, type }: SuggestToken): Promise<void>;
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
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<DirectSignResponse>;
    sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode): Promise<Uint8Array>;
}
