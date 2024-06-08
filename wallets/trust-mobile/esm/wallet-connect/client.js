import { WCClient } from '@cosmos-kit/walletconnect';
export class TrustClient extends WCClient {
    constructor(walletInfo) {
        super(walletInfo);
    }
    getOfflineSignerAmino = void 0;
    async signAmino(chainId, signer, signDoc, signOptions) {
        throw new Error("Trust doesn't support `signAmino` method.");
    }
    async signDirect(chainId, signer, signDoc, signOptions) {
        // Trust doesn't return signed, using signDoc instead
        const result = (await this._signDirect(chainId, signer, signDoc, signOptions));
        return {
            signed: signDoc,
            signature: result,
        };
    }
}
