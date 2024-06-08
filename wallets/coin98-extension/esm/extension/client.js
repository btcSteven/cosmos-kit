import { chainRegistryChainToKeplr } from '@chain-registry/keplr';
import Long from 'long';
export class Coin98Client {
    client;
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
    constructor(client) {
        this.client = client;
    }
    async enable(chainIds) {
        await this.client.enable(chainIds);
    }
    async connect(chainIds) {
        await this.client.enable(chainIds);
    }
    async getSimpleAccount(chainId) {
        await this.enable(chainId);
        const { address, username } = await this.getAccount(chainId);
        return {
            namespace: 'cosmos',
            chainId,
            address,
            username,
        };
    }
    async getAccount(chainId) {
        await this.enable(chainId);
        const key = await this.client.getKey(chainId);
        return {
            username: key.name,
            address: key.bech32Address,
            algo: key.algo,
            pubkey: key.pubKey,
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
        return this.client.getOfflineSignerOnlyAmino(chainId);
    }
    getOfflineSignerDirect(chainId) {
        return {
            getAccounts: async () => {
                return [await this.getAccount(chainId)];
            },
            signDirect: (signerAddress, signDoc) => this.signDirect(chainId, signerAddress, signDoc),
        };
    }
    async addChain(chainInfo) {
        const suggestChain = chainRegistryChainToKeplr(chainInfo.chain, chainInfo.assetList ? [chainInfo.assetList] : []);
        if (chainInfo.preferredEndpoints?.rest?.[0]) {
            suggestChain.rest =
                chainInfo.preferredEndpoints?.rest?.[0];
        }
        if (chainInfo.preferredEndpoints?.rpc?.[0]) {
            suggestChain.rpc =
                chainInfo.preferredEndpoints?.rpc?.[0];
        }
        await this.client.experimentalSuggestChain(suggestChain);
    }
    async signAmino(chainId, signer, signDoc, signOptions) {
        return await this.client.signAmino(chainId, signer, signDoc, signOptions || this.defaultSignOptions);
    }
    async signDirect(chainId, signer, signDoc, signOptions) {
        const resp = await this.client.signDirect(chainId, signer, {
            ...signDoc,
            accountNumber: Long.fromString(signDoc.accountNumber.toString()),
        }, signOptions || this.defaultSignOptions);
        return {
            ...resp,
            signed: {
                ...resp.signed,
                accountNumber: BigInt(resp.signed.accountNumber.toString()),
            },
        };
    }
    async signArbitrary(chainId, signer, data) {
        return await this.client.signArbitrary(chainId, signer, data);
    }
    async sendTx(chainId, tx, mode) {
        return await this.client.sendTx(chainId, tx, mode);
    }
}
