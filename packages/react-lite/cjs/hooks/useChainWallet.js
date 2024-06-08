"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChainWallet = void 0;
const react_1 = require("react");
const provider_1 = require("../provider");
const utils_1 = require("../utils");
const useChainWallet = (chainName, walletName, sync = true) => {
    const context = (0, react_1.useContext)(provider_1.walletContext);
    if (!context) {
        throw new Error('You have forgot to use ChainProvider.');
    }
    const { walletManager } = context;
    const wallet = walletManager.getChainWallet(chainName, walletName);
    wallet.activate();
    const chainWalletContext = (0, react_1.useMemo)(() => {
        if (wallet.chain) {
            return (0, utils_1.getChainWalletContext)(wallet.chain.chain_id, wallet, sync);
        }
        else {
            return void 0;
        }
    }, [wallet.chain]);
    return chainWalletContext;
};
exports.useChainWallet = useChainWallet;
