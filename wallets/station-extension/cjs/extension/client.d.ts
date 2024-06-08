import { AminoSignResponse, StdSignDoc, StdSignature } from '@cosmjs/amino';
import { SignOptions, WalletAccount, WalletClient } from '@cosmos-kit/core';
import Station from '@terra-money/station-connector';
export declare class StationClient implements WalletClient {
    readonly client: Station;
    constructor(client: Station);
    disconnect(): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: any;
        username: any;
    }>;
    getAccount(chainId: string): Promise<WalletAccount>;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, _signOptions?: SignOptions): Promise<AminoSignResponse>;
    getOfflineSigner(chainId: string): Promise<any>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
}
