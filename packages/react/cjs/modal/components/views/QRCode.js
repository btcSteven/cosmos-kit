"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCodeView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@cosmos-kit/core");
const react_1 = require("@interchain-ui/react");
function QRCodeView({ onClose, onReturn, wallet, }) {
    const { walletInfo: { prettyName }, } = wallet;
    const { data, state, message } = wallet.qrUrl ?? {};
    function getParts() {
        let desc = `Open ${prettyName} App to Scan`;
        let errorTitle, errorDesc;
        if (state === 'Error') {
            desc = void 0;
            if (message === core_1.ExpiredError.message) {
                errorTitle = 'QRCode Expired';
                errorDesc = 'Click to refresh.';
            }
            else {
                errorTitle = 'QRCode Error';
                errorDesc = message;
            }
        }
        let status;
        switch (state) {
            case core_1.State.Pending:
                status = 'Pending';
                break;
            case core_1.State.Done:
                status = 'Done';
                break;
            case core_1.State.Error:
                if (message === core_1.ExpiredError.message) {
                    status = 'Expired';
                }
                else {
                    status = 'Error';
                }
                break;
            default:
                status = 'Error';
        }
        return { desc, errorTitle, errorDesc, status };
    }
    const { desc, errorTitle, errorDesc, status } = getParts();
    const onRefresh = () => {
        wallet.connect(false);
    };
    const modalHead = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalHead, { title: prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = ((0, jsx_runtime_1.jsx)(react_1.ConnectModalQRCode, { status: status, link: data || '', description: desc, errorTitle: errorTitle, errorDesc: errorDesc, onRefresh: onRefresh }));
    return { head: modalHead, content: modalContent };
}
exports.QRCodeView = QRCodeView;
