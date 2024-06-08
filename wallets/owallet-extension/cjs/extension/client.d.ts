import { OfflineAminoSigner, StdSignature, StdSignDoc } from '@cosmjs/amino';
import { OfflineDirectSigner } from '@cosmjs/proto-signing';
import { ChainRecord, DirectSignDoc, SignOptions, SignType, SuggestToken, WalletAccount, WalletClient } from '@cosmos-kit/core';
import { BroadcastMode, Keplr } from '@keplr-wallet/types';
export declare class OwalletClient implements WalletClient {
    readonly client: Keplr;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: Keplr);
    enable(chainIds: string | string[]): Promise<void>;
    suggestToken({ chainId, tokens, type }: SuggestToken): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: WalletAccount;
        username: WalletAccount;
    }>;
    getAccount(chainId: string): Promise<WalletAccount>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): any;
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
    addChain(chainInfo: ChainRecord): Promise<void>;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<any>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<any>;
    sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode): Promise<any>;
}
