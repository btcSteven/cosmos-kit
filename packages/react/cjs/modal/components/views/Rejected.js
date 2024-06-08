"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectedView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@interchain-ui/react");
const config_1 = require("./config");
function RejectedView({ onClose, onReturn, wallet, }) {
    const { walletInfo: { prettyName }, } = wallet;
    const onReconnect = () => {
        wallet.connect(false);
    };
    const modalHead = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalHead, { title: prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalStatus, { status: "Rejected", wallet: (0, config_1.getWalletProp)(wallet.walletInfo), contentHeader: 'Request Rejected', contentDesc: wallet.rejectMessageTarget || 'Connection permission is denied.', onConnect: onReconnect }));
    return { head: modalHead, content: modalContent };
}
exports.RejectedView = RejectedView;
