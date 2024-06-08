import { jsx as _jsx } from "react/jsx-runtime";
import { ConnectModalHead, ConnectModalStatus } from '@interchain-ui/react';
import { getWalletProp } from './config';
export function ConnectingView({ onClose, onReturn, wallet, }) {
    const { walletInfo: { prettyName, mode }, message, } = wallet;
    let title = 'Requesting Connection';
    let desc = mode === 'wallet-connect'
        ? `Approve ${prettyName} connection request on your mobile.`
        : `Open the ${prettyName} browser extension to connect your wallet.`;
    if (message === 'InitClient') {
        title = 'Initializing Wallet Client';
        desc = '';
    }
    const modalHead = (_jsx(ConnectModalHead, { title: prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = (_jsx(ConnectModalStatus, { status: "Connecting", wallet: getWalletProp(wallet.walletInfo), contentHeader: title, contentDesc: desc }));
    return { head: modalHead, content: modalContent };
}
