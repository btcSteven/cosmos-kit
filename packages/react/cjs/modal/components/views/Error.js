"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@interchain-ui/react");
const config_1 = require("./config");
function ErrorView({ onClose, onReturn, wallet, }) {
    const { walletInfo: { prettyName }, message, } = wallet;
    const modalHead = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalHead, { title: prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalStatus, { status: "Error", wallet: (0, config_1.getWalletProp)(wallet.walletInfo), contentHeader: 'Oops! Something wrong...', contentDesc: message, onChangeWallet: onReturn }));
    return { head: modalHead, content: modalContent };
}
exports.ErrorView = ErrorView;
