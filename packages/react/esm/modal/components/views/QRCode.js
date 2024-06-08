import { jsx as _jsx } from "react/jsx-runtime";
import { ExpiredError, State } from '@cosmos-kit/core';
import { ConnectModalHead, ConnectModalQRCode, } from '@interchain-ui/react';
export function QRCodeView({ onClose, onReturn, wallet, }) {
    const { walletInfo: { prettyName }, } = wallet;
    const { data, state, message } = wallet.qrUrl ?? {};
    function getParts() {
        let desc = `Open ${prettyName} App to Scan`;
        let errorTitle, errorDesc;
        if (state === 'Error') {
            desc = void 0;
            if (message === ExpiredError.message) {
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
            case State.Pending:
                status = 'Pending';
                break;
            case State.Done:
                status = 'Done';
                break;
            case State.Error:
                if (message === ExpiredError.message) {
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
    const modalHead = (_jsx(ConnectModalHead, { title: prettyName, hasBackButton: true, onClose: onClose, onBack: onReturn }));
    const modalContent = (_jsx(ConnectModalQRCode, { status: status, link: data || '', description: desc, errorTitle: errorTitle, errorDesc: errorDesc, onRefresh: onRefresh }));
    return { head: modalHead, content: modalContent };
}
