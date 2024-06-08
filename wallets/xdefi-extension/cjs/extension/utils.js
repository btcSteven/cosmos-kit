"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXDEFIFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getXDEFIFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const xdefi = window?.xfi?.keplr;
    if (xdefi && !xdefi.isXDEFI) {
        throw core_1.ClientNotExistError;
    }
    if (xdefi) {
        return xdefi;
    }
    if (document.readyState === 'complete') {
        if (xdefi) {
            return xdefi;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                const xdefi = window?.xfi?.keplr;
                if (xdefi) {
                    resolve(xdefi);
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
exports.getXDEFIFromExtension = getXDEFIFromExtension;
