"use strict";
/* eslint @typescript-eslint/no-explicit-any: 0 */ // --> OFF
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosCapsuleClient = void 0;
class CosmosCapsuleClient {
    loginProvider;
    constructor(options) {
        this.loginProvider = options.loginProvider;
    }
    async disconnect() {
        await this.loginProvider.disconnect();
    }
    async getSimpleAccount(chainId) {
        const { address, username } = await this.getAccount(chainId);
        return {
            namespace: "cosmos",
            chainId,
            address,
            username,
        };
    }
    async enable() {
        await this.handleConnect();
    }
    async handleConnect() {
        await this.loginProvider.handleConnect();
    }
    async getAccount(chainId) {
        return this.loginProvider.getAccount(chainId);
    }
    getOfflineSigner(chainId, preferredSignType) {
        return this.loginProvider.getOfflineSigner(chainId, preferredSignType);
    }
    getOfflineSignerAmino(chainId) {
        return this.loginProvider.getOfflineSignerAmino(chainId);
    }
    getOfflineSignerDirect(chainId) {
        return this.loginProvider.getOfflineSignerDirect(chainId);
    }
    async signAmino(chainId, signer, signDoc, signOptions) {
        return this.loginProvider.signAmino(chainId, signer, signDoc, signOptions);
    }
    async signDirect(chainId, signer, signDoc) {
        return this.loginProvider.signDirect(chainId, signer, signDoc);
    }
}
exports.CosmosCapsuleClient = CosmosCapsuleClient;
