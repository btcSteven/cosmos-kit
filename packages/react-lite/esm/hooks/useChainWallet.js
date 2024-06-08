import { useContext, useMemo } from 'react';
import { walletContext } from '../provider';
import { getChainWalletContext } from '../utils';
export const useChainWallet = (chainName, walletName, sync = true) => {
    const context = useContext(walletContext);
    if (!context) {
        throw new Error('You have forgot to use ChainProvider.');
    }
    const { walletManager } = context;
    const wallet = walletManager.getChainWallet(chainName, walletName);
    wallet.activate();
    const chainWalletContext = useMemo(() => {
        if (wallet.chain) {
            return getChainWalletContext(wallet.chain.chain_id, wallet, sync);
        }
        else {
            return void 0;
        }
    }, [wallet.chain]);
    return chainWalletContext;
};
