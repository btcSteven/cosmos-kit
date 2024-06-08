"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOkxwalletFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getOkxwalletFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const okxwallet = window.okxwallet?.keplr;
    if (okxwallet) {
        return okxwallet;
    }
    if (document.readyState === 'complete') {
        if (okxwallet) {
            return okxwallet;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (okxwallet) {
                    resolve(okxwallet);
                }
                else {
                    reject(core_1.ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
exports.getOkxwalletFromExtension = getOkxwalletFromExtension;
