import { AminoSignResponse, StdSignature, StdSignDoc } from '@cosmjs/amino';
import { DirectSignResponse } from '@cosmjs/proto-signing';
import { ChainRecord, DirectSignDoc, SignType } from '@cosmos-kit/core';
import { SignOptions, WalletClient } from '@cosmos-kit/core';
export declare class CosmosSnapClient implements WalletClient {
    readonly snapInstalled: boolean;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor();
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: any;
        username: any;
    }>;
    handleConnect(): Promise<void>;
    getAccount(chainId: string): Promise<{
        username: any;
        address: any;
        algo: Algo;
        pubkey: any;
    }>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): any;
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): {
        getAccounts: () => Promise<{
            username: any;
            address: any;
            algo: Algo;
            pubkey: any;
        }[]>;
        signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
    };
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<AminoSignResponse>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc): Promise<DirectSignResponse>;
    signArbitrary(chainId: string, signer: string, data: string): Promise<StdSignature>;
    addChain(chainRecord: ChainRecord): Promise<void>;
}
