"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChains = void 0;
const react_1 = require("react");
const provider_1 = require("../provider");
const utils_1 = require("../utils");
function useChains(chainNames, sync = true) {
    const names = Array.from(new Set(chainNames));
    const context = (0, react_1.useContext)(provider_1.walletContext);
    if (!context) {
        throw new Error('You have forgotten to use ChainProvider.');
    }
    const { walletManager, modalProvided } = context;
    if (!modalProvided) {
        throw new Error('You have to provide `walletModal` to use `useChains`, or use `useChainWallet` instead.');
    }
    const repos = names.map(name => walletManager.getWalletRepo(name));
    const ids = repos.map(repo => repo.chainRecord.chain.chain_id);
    return names.reduce((result, chainName, index) => {
        const walletRepo = repos[index];
        walletRepo.activate();
        walletRepo.wallets.forEach((wallet) => {
            if (wallet.isModeExtension) {
                wallet.callbacks.beforeConnect = async () => {
                    try {
                        await wallet.client?.enable?.(ids);
                    }
                    catch (e) {
                        for (const repo of repos) {
                            await wallet.client?.addChain?.(repo.chainRecord);
                        }
                        await wallet.client?.enable?.(ids);
                    }
                };
            }
            if (wallet.isModeWalletConnect) {
                wallet.connectChains = async () => {
                    await wallet?.client?.connect?.(ids);
                    for (const name of names.filter((name) => name !== chainName)) {
                        await wallet.mainWallet
                            .getChainWallet(name)
                            .update({ connect: false });
                    }
                };
            }
        });
        const { connect, disconnect, openView, closeView, current, chainRecord: { chain, assetList }, getRpcEndpoint, getRestEndpoint, getStargateClient, getCosmWasmClient, getNameService, } = walletRepo;
        const chainWalletContext = (0, utils_1.getChainWalletContext)(chain.chain_id, current, sync);
        result[chainName] = {
            ...chainWalletContext,
            walletRepo,
            chain,
            assets: assetList,
            openView,
            closeView,
            connect: () => connect(localStorage.getItem('cosmos-kit@2:core//current-wallet'), sync),
            disconnect: () => disconnect(void 0, sync),
            getRpcEndpoint,
            getRestEndpoint,
            getStargateClient,
            getCosmWasmClient,
            getNameService,
        };
        return result;
    }, {});
}
exports.useChains = useChains;
