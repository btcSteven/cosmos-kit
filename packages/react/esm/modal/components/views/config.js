import { ConnectedView } from './Connected';
import { ConnectingView } from './Connecting';
import { ErrorView } from './Error';
import { NotExistView } from './NotExist';
import { QRCodeView } from './QRCode';
import { RejectedView } from './Rejected';
import { WalletListView } from './WalletList';
export const defaultModalViews = {
    Connecting: ConnectingView,
    Connected: ConnectedView,
    Error: ErrorView,
    NotExist: NotExistView,
    Rejected: RejectedView,
    QRCode: QRCodeView,
    WalletList: WalletListView,
};
export function getWalletProp(wallet) {
    const { prettyName, mode, name, logo, mobileDisabled } = wallet;
    return {
        name,
        prettyName,
        logo: typeof logo === 'object' ? logo.major : logo,
        mobileDisabled: typeof mobileDisabled === 'boolean' ? mobileDisabled : mobileDisabled(),
        isMobile: mode === 'wallet-connect',
    };
}
