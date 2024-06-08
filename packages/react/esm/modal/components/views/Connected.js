import { jsx as _jsx } from "react/jsx-runtime";
import { ConnectModalHead, ConnectModalStatus } from '@interchain-ui/react';
import { AstronautSvg } from '../Astronaut';
import { getWalletProp } from './config';
export function ConnectedView({ onClose, onReturn, wallet, options, }) {
    const { walletInfo, username, address } = wallet;
    const onDisconnect = async () => {
        await wallet.disconnect(true, {
            walletconnect: {
                removeAllPairings: options?.mobile.displayQRCodeEveryTime,
            },
        });
    };
    const modalHead = (_jsx(ConnectModalHead, { title: walletInfo.prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = (_jsx(ConnectModalStatus, { wallet: getWalletProp(walletInfo), status: "Connected", connectedInfo: {
            name: username ?? 'Wallet',
            avatar: (_jsx(AstronautSvg, { style: {
                    fontSize: 'inherit',
                    width: '100%',
                    height: '100%',
                } })),
            address,
        }, onDisconnect: onDisconnect }));
    return { head: modalHead, content: modalContent };
}
