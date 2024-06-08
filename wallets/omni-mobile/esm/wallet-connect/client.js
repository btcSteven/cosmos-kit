import { WCClient } from '@cosmos-kit/walletconnect';
export class OmniClient extends WCClient {
    constructor(walletInfo) {
        super(walletInfo);
    }
    async signAmino(chainId, signer, signDoc, signOptions) {
        const { signDoc: signed, signature } = (await this._signAmino(chainId, signer, signDoc, signOptions));
        return {
            signed,
            signature,
        };
    }
    async signDirect(chainId, signer, signDoc, signOptions) {
        const { signDoc: signed, signature } = (await this._signDirect(chainId, signer, signDoc, signOptions));
        return {
            signed,
            signature,
        };
    }
}
