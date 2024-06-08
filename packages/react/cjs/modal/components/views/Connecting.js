"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectingView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@interchain-ui/react");
const config_1 = require("./config");
function ConnectingView({ onClose, onReturn, wallet, }) {
    const { walletInfo: { prettyName, mode }, message, } = wallet;
    let title = 'Requesting Connection';
    let desc = mode === 'wallet-connect'
        ? `Approve ${prettyName} connection request on your mobile.`
        : `Open the ${prettyName} browser extension to connect your wallet.`;
    if (message === 'InitClient') {
        title = 'Initializing Wallet Client';
        desc = '';
    }
    const modalHead = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalHead, { title: prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalStatus, { status: "Connecting", wallet: (0, config_1.getWalletProp)(wallet.walletInfo), contentHeader: title, contentDesc: desc }));
    return { head: modalHead, content: modalContent };
}
exports.ConnectingView = ConnectingView;
