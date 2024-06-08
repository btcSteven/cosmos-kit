"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@interchain-ui/react");
const Astronaut_1 = require("../Astronaut");
const config_1 = require("./config");
function ConnectedView({ onClose, onReturn, wallet, options, }) {
    const { walletInfo, username, address } = wallet;
    const onDisconnect = async () => {
        await wallet.disconnect(true, {
            walletconnect: {
                removeAllPairings: options?.mobile.displayQRCodeEveryTime,
            },
        });
    };
    const modalHead = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalHead, { title: walletInfo.prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalStatus, { wallet: (0, config_1.getWalletProp)(walletInfo), status: "Connected", connectedInfo: {
            name: username ?? 'Wallet',
            avatar: ((0, jsx_runtime_1.jsx)(Astronaut_1.AstronautSvg, { style: {
                    fontSize: 'inherit',
                    width: '100%',
                    height: '100%',
                } })),
            address,
        }, onDisconnect: onDisconnect }));
    return { head: modalHead, content: modalContent };
}
exports.ConnectedView = ConnectedView;
