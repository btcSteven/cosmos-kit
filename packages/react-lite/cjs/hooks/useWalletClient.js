"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletClient = void 0;
const core_1 = require("@cosmos-kit/core");
const react_1 = require("react");
const provider_1 = require("../provider");
const useWalletClient = (walletName) => {
    const context = (0, react_1.useContext)(provider_1.walletContext);
    if (!context) {
        throw new Error('You have forgot to use ChainProvider.');
    }
    const { walletManager } = context;
    const mainWallet = walletName
        ? walletManager.getMainWallet(walletName)
        : walletManager.mainWallets.find((w) => w.isActive);
    if (!mainWallet) {
        return {
            client: void 0,
            status: core_1.State.Init,
            message: void 0,
        };
    }
    const { clientMutable } = mainWallet;
    return {
        client: clientMutable.data,
        status: clientMutable.state,
        message: clientMutable.message,
    };
};
exports.useWalletClient = useWalletClient;
