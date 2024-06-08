import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { ChainRecord, DirectSignDoc, SignType } from '@cosmos-kit/core';
import { SignOptions, WalletClient } from '@cosmos-kit/core';
import { CosmosSnap } from '@cosmsnap/snapper';
export declare class CosmosExtensionClient implements WalletClient {
    cosmos: CosmosSnap;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor();
    addChain(chainInfo: ChainRecord): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: any;
    }>;
    getAccount(chainId: string): Promise<{
        address: any;
        algo: Algo;
        pubkey: any;
    }>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): any;
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): {
        getAccounts: () => Promise<{
            address: any;
            algo: Algo;
            pubkey: any;
        }[]>;
        signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<any>;
    };
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<any>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<any>;
}
