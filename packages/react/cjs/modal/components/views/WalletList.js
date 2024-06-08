"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletListView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@interchain-ui/react");
const react_2 = require("react");
const config_1 = require("./config");
function DynamicWalletList({ wallets, onClose }) {
    const [isLargeScreen, setIsLargeScreen] = (0, react_2.useState)(true);
    const onWalletClicked = (0, react_2.useCallback)(async (wallet) => {
        await wallet.connect(wallet.walletStatus !== 'NotExist');
        if (!['Rejected', 'NotExist'].includes(wallet.walletStatus)) {
            onClose();
        }
    }, []);
    (0, react_2.useEffect)(() => {
        const handleWindowResize = () => {
            if (window.innerWidth >= 768) {
                setIsLargeScreen(true);
            }
            else {
                setIsLargeScreen(false);
            }
        };
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    const walletsData = (0, react_2.useMemo)(() => wallets
        .sort((a, b) => {
        if (a.walletInfo.mode !== 'wallet-connect' &&
            b.walletInfo.mode !== 'wallet-connect') {
            return 0;
        }
        else if (a.walletInfo.mode !== 'wallet-connect') {
            return -1;
        }
        else {
            return 1;
        }
    })
        .map((wallet, i) => {
        return {
            ...(0, config_1.getWalletProp)(wallet.walletInfo),
            // subLogo can either be 'walletConnect' or a valid <img /> src attribute
            subLogo: wallet.walletInfo.mode === 'wallet-connect'
                ? 'walletConnect'
                : undefined,
            btmLogo: typeof wallet.walletInfo.logo === 'object'
                ? wallet.walletInfo.logo.minor
                : wallet.walletInfo.extends,
            badge: { MetaMask: 'SNAP' }[wallet.walletInfo.extends],
            shape: (i < 2 && isLargeScreen ? 'square' : 'list'),
            downloadUrl: '',
            originalWallet: wallet,
        };
    }), [wallets, isLargeScreen]);
    return ((0, jsx_runtime_1.jsx)(react_1.ConnectModalWalletList, { wallets: walletsData, onWalletItemClick: onWalletClicked }));
}
function WalletListView({ onClose, wallets, initialFocus, }) {
    const modalHead = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalHead, { title: "Select your wallet", hasBackButton: false, onClose: onClose }));
    const modalContent = ((0, jsx_runtime_1.jsx)(DynamicWalletList, { wallets: wallets, onClose: onClose }));
    return { head: modalHead, content: modalContent };
}
exports.WalletListView = WalletListView;
