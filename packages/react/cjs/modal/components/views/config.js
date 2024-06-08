"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletProp = exports.defaultModalViews = void 0;
const Connected_1 = require("./Connected");
const Connecting_1 = require("./Connecting");
const Error_1 = require("./Error");
const NotExist_1 = require("./NotExist");
const QRCode_1 = require("./QRCode");
const Rejected_1 = require("./Rejected");
const WalletList_1 = require("./WalletList");
exports.defaultModalViews = {
    Connecting: Connecting_1.ConnectingView,
    Connected: Connected_1.ConnectedView,
    Error: Error_1.ErrorView,
    NotExist: NotExist_1.NotExistView,
    Rejected: Rejected_1.RejectedView,
    QRCode: QRCode_1.QRCodeView,
    WalletList: WalletList_1.WalletListView,
};
function getWalletProp(wallet) {
    const { prettyName, mode, name, logo, mobileDisabled } = wallet;
    return {
        name,
        prettyName,
        logo: typeof logo === 'object' ? logo.major : logo,
        mobileDisabled: typeof mobileDisabled === 'boolean' ? mobileDisabled : mobileDisabled(),
        isMobile: mode === 'wallet-connect',
    };
}
exports.getWalletProp = getWalletProp;
