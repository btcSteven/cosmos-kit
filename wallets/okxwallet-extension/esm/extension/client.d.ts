import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { DirectSignDoc, SignOptions, WalletClient } from '@cosmos-kit/core';
import { Okxwallet } from './types';
export declare class OkxwalletClient implements WalletClient {
    readonly client: Okxwallet;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: Okxwallet);
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
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<AminoSignResponse>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<DirectSignResponse>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    getOfflineSigner(chainId: string): any;
}
