"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotExistView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@interchain-ui/react");
const FaAndroid_1 = require("@react-icons/all-files/fa/FaAndroid");
const GoDesktopDownload_1 = require("@react-icons/all-files/go/GoDesktopDownload");
const GrFirefox_1 = require("@react-icons/all-files/gr/GrFirefox");
const RiAppStoreFill_1 = require("@react-icons/all-files/ri/RiAppStoreFill");
const RiChromeFill_1 = require("@react-icons/all-files/ri/RiChromeFill");
const config_1 = require("./config");
function NotExistView({ onClose, onReturn, wallet, }) {
    const { walletInfo: { prettyName }, downloadInfo, } = wallet;
    const onInstall = () => {
        window.open(downloadInfo?.link, '_blank');
    };
    const IconComp = getIcon(downloadInfo);
    const modalHead = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalHead, { title: prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalStatus, { status: "NotExist", wallet: (0, config_1.getWalletProp)(wallet.walletInfo), contentHeader: `${prettyName} Not Installed`, contentDesc: onInstall
            ? `If ${prettyName.toLowerCase()} is installed on your device, please refresh this page or follow the browser instruction.`
            : `Download link not provided. Try searching it or consulting the developer team.`, onInstall: onInstall, installIcon: (0, jsx_runtime_1.jsx)(IconComp, {}), disableInstall: !downloadInfo?.link }));
    return { head: modalHead, content: modalContent };
}
exports.NotExistView = NotExistView;
function getIcon(downloadInfo) {
    if (downloadInfo?.browser === 'chrome')
        return RiChromeFill_1.RiChromeFill;
    if (downloadInfo?.browser === 'firefox')
        return GrFirefox_1.GrFirefox;
    if (downloadInfo?.os === 'android')
        return FaAndroid_1.FaAndroid;
    if (downloadInfo?.os === 'ios')
        return RiAppStoreFill_1.RiAppStoreFill;
    return GoDesktopDownload_1.GoDesktopDownload;
}
