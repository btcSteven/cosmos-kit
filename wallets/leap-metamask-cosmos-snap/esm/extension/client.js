import { CosmjsOfflineSigner, experimentalSuggestChain, signArbitrary, } from '@leapwallet/cosmos-snap-provider';
import { connectSnap, getKey, getSnap, requestSignAmino, requestSignature, } from '@leapwallet/cosmos-snap-provider';
import Long from 'long';
export class CosmosSnapClient {
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
        const installedSnap = await getSnap();
        if (!installedSnap) {
            await connectSnap();
        }
    }
    async getAccount(chainId) {
        await this.handleConnect();
        const key = await getKey(chainId);
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
        return new CosmjsOfflineSigner(chainId);
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
        return requestSignAmino(chainId, signer, signDoc);
    }
    async signDirect(chainId, signer, signDoc) {
        const _accountNumber = Long.fromString(signDoc.accountNumber.toString());
        const signature = (await requestSignature(chainId, signer, {
            ...signDoc,
            // @ts-ignore
            accountNumber: _accountNumber,
        }));
        const modifiedAccountNumber = new Long(_accountNumber.low, _accountNumber.high, _accountNumber.unsigned);
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
        return (await signArbitrary(chainId, signer, data));
    }
    async addChain(chainRecord) {
        const chainInfo = {
            chainId: chainRecord?.chain?.chain_id,
            chainName: chainRecord?.chain?.chain_name,
            bip44: { coinType: chainRecord?.chain?.slip44 },
            bech32Config: { bech32PrefixAccAddr: chainRecord?.chain?.bech32_prefix },
        };
        await experimentalSuggestChain(chainInfo, {});
    }
}
