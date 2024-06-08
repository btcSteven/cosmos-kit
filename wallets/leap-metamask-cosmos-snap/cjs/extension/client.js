"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosSnapClient = void 0;
const cosmos_snap_provider_1 = require("@leapwallet/cosmos-snap-provider");
const cosmos_snap_provider_2 = require("@leapwallet/cosmos-snap-provider");
const long_1 = __importDefault(require("long"));
class CosmosSnapClient {
    snapInstalled = false;
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
        this.snapInstalled = localStorage.getItem('snapInstalled') === 'true';
    }
    async getSimpleAccount(chainId) {
        const { address, username } = await this.getAccount(chainId);
        return {
            namespace: 'cosmos',
            chainId,
            address,
            username,
        };
    }
    async handleConnect() {
        const installedSnap = await (0, cosmos_snap_provider_2.getSnap)();
        if (!installedSnap) {
            await (0, cosmos_snap_provider_2.connectSnap)();
        }
    }
    async getAccount(chainId) {
        await this.handleConnect();
        const key = await (0, cosmos_snap_provider_2.getKey)(chainId);
        return {
            username: key?.address,
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
    }
    getOfflineSignerAmino(chainId) {
        return new cosmos_snap_provider_1.CosmjsOfflineSigner(chainId);
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
        return (0, cosmos_snap_provider_2.requestSignAmino)(chainId, signer, signDoc);
    }
    async signDirect(chainId, signer, signDoc) {
        const _accountNumber = long_1.default.fromString(signDoc.accountNumber.toString());
        const signature = (await (0, cosmos_snap_provider_2.requestSignature)(chainId, signer, {
            ...signDoc,
            // @ts-ignore
            accountNumber: _accountNumber,
        }));
        const modifiedAccountNumber = new long_1.default(_accountNumber.low, _accountNumber.high, _accountNumber.unsigned);
        return {
            signature: signature.signature,
            signed: {
                ...signature.signed,
                accountNumber: BigInt(modifiedAccountNumber.toString()),
                authInfoBytes: new Uint8Array(Object.values(signature.signed.authInfoBytes)),
                bodyBytes: new Uint8Array(Object.values(signature.signed.bodyBytes)),
            },
        };
    }
    async signArbitrary(chainId, signer, data) {
        return (await (0, cosmos_snap_provider_1.signArbitrary)(chainId, signer, data));
    }
    async addChain(chainRecord) {
        const chainInfo = {
            chainId: chainRecord?.chain?.chain_id,
            chainName: chainRecord?.chain?.chain_name,
            bip44: { coinType: chainRecord?.chain?.slip44 },
            bech32Config: { bech32PrefixAccAddr: chainRecord?.chain?.bech32_prefix },
        };
        await (0, cosmos_snap_provider_1.experimentalSuggestChain)(chainInfo, {});
    }
}
exports.CosmosSnapClient = CosmosSnapClient;
