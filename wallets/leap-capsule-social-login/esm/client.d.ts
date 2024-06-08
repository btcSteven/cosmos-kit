 
import { StdSignDoc } from "@cosmjs/amino";
import { SignOptions, SignType } from "@cosmos-kit/core";
import { DirectSignDoc, WalletClient } from "@cosmos-kit/core";
import { CapsuleProvider } from "@leapwallet/cosmos-social-login-capsule-provider";
export declare class CosmosCapsuleClient implements WalletClient {
    readonly loginProvider: CapsuleProvider;
    constructor(options: {
        loginProvider: CapsuleProvider;
    });
    disconnect(): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: any;
        username: any;
    }>;
    enable(): Promise<void>;
    handleConnect(): Promise<void>;
    getAccount(chainId: string): Promise<any>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): any;
    getOfflineSignerAmino(chainId: string): any;
    getOfflineSignerDirect(chainId: string): any;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<any>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc): Promise<any>;
}
