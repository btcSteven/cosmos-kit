"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChain = void 0;
const react_1 = require("react");
const provider_1 = require("../provider");
const utils_1 = require("../utils");
const useChain = (chainName, sync = true) => {
    const context = (0, react_1.useContext)(provider_1.walletContext);
    const [_, forceRender] = (0, react_1.useState)(0);
    if (!context) {
        throw new Error('You have forgot to use ChainProvider.');
    }
    const { walletManager, modalProvided } = context;
    if (!modalProvided) {
        throw new Error('You have to provide `walletModal` to use `useChain`, or use `useChainWallet` instead.');
    }
    const walletRepo = walletManager.getWalletRepo(chainName);
    walletRepo.activate();
    const { connect, disconnect, openView, closeView, current, chainRecord: { chain, assetList }, getRpcEndpoint, getRestEndpoint, getStargateClient, getCosmWasmClient, getNameService, } = walletRepo;
    const chainWalletContext = (0, react_1.useMemo)(() => {
        if (chain) {
            return (0, utils_1.getChainWalletContext)(chain.chain_id, current, sync);
        }
        else {
            return void 0;
        }
    }, [chain, current, current?.state]);
    (0, react_1.useEffect)(() => {
        forceRender((i) => i + 1);
    }, [chain, assetList, chainWalletContext?.address]);
    // temporary solution for sync not working when the used chain is changed without page rendering (only component rendering)
    (0, react_1.useEffect)(() => {
        const currentWallet = window.localStorage.getItem('cosmos-kit@2:core//current-wallet');
        if (sync &&
            chainWalletContext &&
            chainWalletContext.isWalletDisconnected &&
            currentWallet) {
            connect(currentWallet);
        }
    }, [chain, assetList]);
    return {
        ...chainWalletContext,
        walletRepo,
        chain,
        assets: assetList,
        openView,
        closeView,
        connect: () => connect(void 0, sync),
        disconnect: (options) => disconnect(void 0, sync, options),
        getRpcEndpoint,
        getRestEndpoint,
        getStargateClient,
        getCosmWasmClient,
        getNameService,
    };
};
exports.useChain = useChain;
