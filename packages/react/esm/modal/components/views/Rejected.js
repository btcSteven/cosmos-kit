import { jsx as _jsx } from "react/jsx-runtime";
import { ConnectModalHead, ConnectModalStatus } from '@interchain-ui/react';
import { getWalletProp } from './config';
export function RejectedView({ onClose, onReturn, wallet, }) {
    const { walletInfo: { prettyName }, } = wallet;
    const onReconnect = () => {
        wallet.connect(false);
    };
    const modalHead = (_jsx(ConnectModalHead, { title: prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = (_jsx(ConnectModalStatus, { status: "Rejected", wallet: getWalletProp(wallet.walletInfo), contentHeader: 'Request Rejected', contentDesc: wallet.rejectMessageTarget || 'Connection permission is denied.', onConnect: onReconnect }));
    return { head: modalHead, content: modalContent };
}
