"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TailwindExtensionWallet = exports.TailwindClient = exports.ChainTailwindExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const __1 = require("..");
/**
 * Keplr and leap both leave this interface empty.
 * Used in TailwindExtensionWallet's instantiation.
 */
class ChainTailwindExtension extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainTailwindExtension = ChainTailwindExtension;
class TailwindClient {
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
exports.TailwindClient = TailwindClient;
class TailwindExtensionWallet extends core_1.MainWalletBase {
    constructor(wallet_info) {
        super(wallet_info, ChainTailwindExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const tailwind = await (0, __1.getWalletFromWindow)();
            this.initClientDone(tailwind ? new TailwindClient(tailwind) : undefined);
        }
        catch (err) {
            this.initClientError(err);
        }
    }
}
exports.TailwindExtensionWallet = TailwindExtensionWallet;
