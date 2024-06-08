export class InitiaClient {
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
    async getSimpleAccount(chainId) {
        const address = await this.client.getAddress(chainId);
        return {
            namespace: 'cosmos',
            chainId,
            address,
        };
    }
    getOfflineSigner(chainId) {
        return this.client.getOfflineSigner(chainId);
    }
    async getAccount(chainId) {
        const offlineSigner = this.getOfflineSigner(chainId);
        const key = (await offlineSigner.getAccounts())[0];
        return {
            address: key.address,
            algo: key.algo,
            pubkey: key.pubkey,
        };
    }
    async signDirect(chainId, signer, signDoc) {
        const offlineSigner = this.getOfflineSigner(chainId);
        return await offlineSigner.signDirect(signer, signDoc);
    }
}
