import { chainRegistryChainToCosmostation } from '@chain-registry/cosmostation';
import Long from 'long';
export class CosmostationClient {
    client;
    eventMap = new Map();
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
    get cosmos() {
        return this.client.cosmos;
    }
    get ikeplr() {
        return this.client.providers.keplr;
    }
    async suggestToken({ chainName, tokens, type }) {
        if (type === 'cw20') {
            await this.cosmos.request({
                method: 'cos_addTokensCW20',
                params: {
                    chainName,
                    tokens,
                },
            });
        }
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
    async getAccount(chainId) {
        const key = (await this.cosmos.request({
            method: 'cos_requestAccount',
            params: { chainName: chainId },
        }));
        return {
            username: key.name,
            address: key.address,
            pubkey: key.publicKey,
            algo: key.algo,
        };
    }
    async disconnect() {
        await this.cosmos.request({
            method: 'cos_disconnect',
        });
    }
    on(type, listener) {
        const event = this.cosmos.on(type, listener);
        const typeEventMap = this.eventMap.get(type) || new Map();
        typeEventMap.set(listener, event);
        this.eventMap.set(type, typeEventMap);
    }
    off(type, listener) {
        const event = this.eventMap.get(type)?.get(listener);
        if (event) {
            this.cosmos.off(event);
        }
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
        // return this.ikeplr.getOfflineSignerAuto(chainId);
    }
    getOfflineSignerAmino(chainId) {
        return this.ikeplr.getOfflineSignerOnlyAmino(chainId);
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
        const suggestChain = chainRegistryChainToCosmostation(chainInfo.chain, chainInfo.assetList ? [chainInfo.assetList] : []);
        if (chainInfo.preferredEndpoints?.rest?.[0]) {
            suggestChain.restURL =
                chainInfo.preferredEndpoints?.rest?.[0];
        }
        const result = (await this.cosmos.request({
            method: 'cos_addChain',
            params: suggestChain,
        }));
        if (!result) {
            throw new Error(`Failed to add chain ${chainInfo.name}.`);
        }
    }
    async signAmino(chainId, signer, signDoc, signOptions) {
        if (this.ikeplr?.signAmino) {
            return await this.ikeplr.signAmino(chainId, signer, signDoc, signOptions || this.defaultSignOptions);
        }
        return await this.cosmos.request({
            method: 'cos_signAmino',
            params: {
                chainName: chainId,
                doc: signDoc,
                isEditMemo: (signOptions || this.defaultSignOptions).preferNoSetMemo,
                isEditFee: (signOptions || this.defaultSignOptions).preferNoSetFee,
            },
        });
    }
    async signDirect(chainId, signer, signDoc, signOptions) {
        if (this.ikeplr?.signDirect) {
            const resp = await this.ikeplr.signDirect(chainId, signer, {
                ...signDoc,
                accountNumber: Long.fromString(signDoc.accountNumber.toString(), false),
            }, signOptions || this.defaultSignOptions);
            return {
                ...resp,
                signed: {
                    ...resp.signed,
                    accountNumber: BigInt(resp.signed.accountNumber.toString()),
                },
            };
        }
        return await this.cosmos.request({
            method: 'cos_signDirect',
            params: {
                chainName: chainId,
                doc: signDoc,
                isEditMemo: (signOptions || this.defaultSignOptions).preferNoSetMemo,
                isEditFee: (signOptions || this.defaultSignOptions).preferNoSetFee,
            },
        });
    }
    async signArbitrary(chainId, signer, data) {
        try {
            return await this.ikeplr.signArbitrary(chainId, signer, data);
        }
        catch (error) {
            // https://github.com/cosmostation/cosmostation-chrome-extension-client/blob/main/src/cosmos.ts#LL70C17-L70C28
            const message = typeof data === 'string' ? data : new TextDecoder('utf-8').decode(data);
            return await this.cosmos.request({
                method: 'cos_signMessage',
                params: {
                    chainName: chainId,
                    signer,
                    message,
                },
            });
        }
    }
    async sendTx(chainId, tx, mode) {
        return await this.ikeplr.sendTx(chainId, tx, mode);
    }
}
