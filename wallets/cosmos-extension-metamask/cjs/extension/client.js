"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosExtensionClient = void 0;
const snapper_1 = require("@cosmsnap/snapper");
class CosmosExtensionClient {
    cosmos;
    _defaultSignOptions = {
        preferNoSetFee: false,
        preferNoSetMemo: true,
        disableBalanceCheck: true,
    };
    get defaultSignOptions() {
        return this._defaultSignOptions;
    }
    setDefaultSignOptions(options) {
        this._defaultSignOptions = options;
    }
    constructor() {
        this.cosmos = new snapper_1.CosmosSnap();
    }
    async addChain(chainInfo) {
        await (0, snapper_1.suggestChain)(chainInfo.chain);
    }
    async getSimpleAccount(chainId) {
        const { address } = await this.getAccount(chainId);
        return {
            namespace: 'cosmos',
            chainId,
            address,
        };
    }
    async getAccount(chainId) {
        await (0, snapper_1.installSnap)();
        const key = await this.cosmos.getAccount(chainId);
        return {
            address: key.address,
            algo: key.algo,
            pubkey: key.pubkey,
        };
    }
    getOfflineSigner(chainId, preferredSignType) {
        switch (preferredSignType) {
            case 'amino':
                return this.getOfflineSignerAmino(chainId);
            case 'direct':
                return this.getOfflineSignerDirect(chainId);
            default:
                return this.getOfflineSignerAmino(chainId);
        }
        // return this.client.getOfflineSignerAuto(chainId);
    }
    getOfflineSignerAmino(chainId) {
        return new snapper_1.CosmJSOfflineSigner(chainId);
    }
    getOfflineSignerDirect(chainId) {
        return {
            getAccounts: async () => {
                return [await this.getAccount(chainId)];
            },
            signDirect: (signerAddress, signDoc) => this.signDirect(chainId, signerAddress, signDoc),
        };
    }
    async signAmino(chainId, signer, signDoc, signOptions) {
        return await this.cosmos.signAmino(chainId, signer, signDoc);
    }
    async signArbitrary(chainId, signer, data) {
        const signature = await this.cosmos.signArbitrary(chainId, signer, data);
        return signature;
    }
    async signDirect(chainId, signer, signDoc, signOptions) {
        return this.cosmos.signDirect(chainId, signer, signDoc);
    }
}
exports.CosmosExtensionClient = CosmosExtensionClient;
