"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useManager = void 0;
const react_1 = require("react");
const provider_1 = require("../provider");
const useManager = () => {
    const context = (0, react_1.useContext)(provider_1.walletContext);
    if (!context) {
        throw new Error('You have forgot to use ChainProvider.');
    }
    const { walletManager: { mainWallets, chainRecords, walletRepos, defaultNameService, getChainRecord, getWalletRepo, addChains, addEndpoints, getChainLogo, getNameService, on, off, }, } = context;
    return {
        chainRecords,
        walletRepos,
        mainWallets,
        defaultNameService,
        getChainRecord,
        getWalletRepo,
        addChains,
        addEndpoints,
        getChainLogo,
        getNameService,
        on,
        off,
    };
};
exports.useManager = useManager;
