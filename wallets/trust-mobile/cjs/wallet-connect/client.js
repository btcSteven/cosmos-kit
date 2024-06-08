"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustClient = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
class TrustClient extends walletconnect_1.WCClient {
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
exports.TrustClient = TrustClient;
