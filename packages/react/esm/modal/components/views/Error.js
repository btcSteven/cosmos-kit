import { jsx as _jsx } from "react/jsx-runtime";
import { ConnectModalHead, ConnectModalStatus } from '@interchain-ui/react';
import { getWalletProp } from './config';
export function ErrorView({ onClose, onReturn, wallet, }) {
    const { walletInfo: { prettyName }, message, } = wallet;
    const modalHead = (_jsx(ConnectModalHead, { title: prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = (_jsx(ConnectModalStatus, { status: "Error", wallet: getWalletProp(wallet.walletInfo), contentHeader: 'Oops! Something wrong...', contentDesc: message, onChangeWallet: onReturn }));
    return { head: modalHead, content: modalContent };
}
