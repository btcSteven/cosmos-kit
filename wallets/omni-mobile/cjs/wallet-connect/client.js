"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmniClient = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
class OmniClient extends walletconnect_1.WCClient {
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
exports.OmniClient = OmniClient;
