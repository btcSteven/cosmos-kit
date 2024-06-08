"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOWalletFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getOWalletFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    //@ts-ignore
    const owallet = window.owallet;
    if (owallet) {
        return owallet;
    }
    if (document.readyState === 'complete') {
        if (owallet) {
            return owallet;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                //@ts-ignore
                const owallet = window.owallet;
                if (owallet) {
                    resolve(owallet);
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
exports.getOWalletFromExtension = getOWalletFromExtension;
