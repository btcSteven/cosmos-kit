"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const react_1 = require("react");
const provider_1 = require("../provider");
const useWallet = (walletName, activeOnly = true) => {
    const context = (0, react_1.useContext)(provider_1.walletContext);
    if (!context) {
        throw new Error('You have forgot to use ChainProvider.');
    }
    const { walletManager } = context;
    const mainWallet = walletName
        ? walletManager.getMainWallet(walletName)
        : walletManager.mainWallets.find((w) => w.isActive && w.clientMutable.state !== core_1.State.Error);
    if (!mainWallet) {
        return {
            mainWallet,
            chainWallets: [],
            wallet: void 0,
            status: core_1.WalletStatus.Disconnected,
            message: void 0,
        };
    }
    const { walletInfo, getChainWalletList, getGlobalStatusAndMessage } = mainWallet;
    const [globalStatus, globalMessage] = getGlobalStatusAndMessage(activeOnly);
    return {
        mainWallet,
        chainWallets: getChainWalletList(false),
        wallet: walletInfo,
        status: globalStatus,
        message: globalMessage,
    };
};
exports.useWallet = useWallet;
