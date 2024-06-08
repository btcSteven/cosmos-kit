import { StdSignature } from '@cosmjs/amino';
import { Cosmiframe } from '@dao-dao/cosmiframe';
import { SignType, WalletAccount, WalletClient } from '../../types';
export declare class CosmiframeClient implements WalletClient {
    private cosmiframe;
    constructor(cosmiframe: Cosmiframe);
    getSimpleAccount(...params: any[]): Promise<any>;
    connect(...params: any[]): Promise<any>;
    enable(...params: any[]): Promise<void>;
    suggestToken(...params: any[]): Promise<void>;
    addChain(...params: any[]): Promise<void>;
    getAccount(...params: any[]): Promise<WalletAccount>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): import("@dao-dao/cosmiframe/dist/client-DcGSOj8B").a | import("@dao-dao/cosmiframe/dist/client-DcGSOj8B").b;
    getOfflineSignerAmino(chainId: string): import("@dao-dao/cosmiframe/dist/client-DcGSOj8B").b;
    getOfflineSignerDirect(chainId: string): import("@dao-dao/cosmiframe/dist/client-DcGSOj8B").a;
    sign(...params: any[]): Promise<any>;
    signAmino(...params: any[]): Promise<any>;
    signDirect(...params: any[]): Promise<any>;
    signArbitrary(...params: any[]): Promise<StdSignature>;
    getEnigmaPubKey(...params: any[]): Promise<any>;
    getEnigmaTxEncryptionKey(...params: any[]): Promise<any>;
    enigmaEncrypt(...params: any[]): Promise<any>;
    enigmaDecrypt(...params: any[]): Promise<any>;
    sendTx(...params: any[]): Promise<any>;
}
