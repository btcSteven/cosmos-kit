import { ChainWalletBase, MainWalletBase, } from '@cosmos-kit/core';
import { getWalletFromWindow } from '..';
/**
 * Keplr and leap both leave this interface empty.
 * Used in TailwindExtensionWallet's instantiation.
 */
export class ChainTailwindExtension extends ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
export class TailwindClient {
    tailwind;
    constructor(tailwind) {
        this.tailwind = tailwind;
        this.tailwind = tailwind;
    }
    async getAccount(chainId) {
        const signer = await this.tailwind.getOfflineSigner(chainId);
        const [acc] = await signer.getAccounts();
        return {
            algo: acc.algo,
            address: acc.address,
            pubkey: acc.pubkey,
        };
    }
    async getSimpleAccount(chainId) {
        const signer = await this.tailwind.getOfflineSigner(chainId);
        const [acc] = await signer.getAccounts();
        return {
            chainId,
            namespace: 'tailwind-wallet',
            address: acc.address,
        };
    }
    async getOfflineSigner(chainId) {
        return this.tailwind.getOfflineSigner(chainId);
    }
}
export class TailwindExtensionWallet extends MainWalletBase {
    constructor(wallet_info) {
        super(wallet_info, ChainTailwindExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const tailwind = await getWalletFromWindow();
            this.initClientDone(tailwind ? new TailwindClient(tailwind) : undefined);
        }
        catch (err) {
            this.initClientError(err);
        }
    }
}
