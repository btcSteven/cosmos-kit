"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExodusClient = void 0;
class ExodusClient {
    client;
    constructor(client) {
        this.client = client;
    }
    async connect(chainId) {
        await this.client.connect({
            chainId: Array.isArray(chainId) ? chainId[0] : chainId,
        });
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
        const response = await this.client.connect({ chainId });
        return {
            ...response,
            pubkey: response.publicKey,
        };
    }
    async getOfflineSigner(chainId) {
        return {
            getAccounts: async () => [
                await this.getAccount(chainId),
            ],
            signDirect: async (signer, signDoc) => {
                return this.client.signTransaction(signDoc);
            },
        };
    }
    async signAmino(chainId, signer, signDoc) {
        return this.client.signAminoTransaction(signDoc);
    }
    async sendTx(chainId, transaction, mode) {
        return this.client.sendTx(chainId, transaction, mode);
    }
}
exports.ExodusClient = ExodusClient;
