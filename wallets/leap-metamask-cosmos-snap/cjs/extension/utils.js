"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMetamaskInstalled = void 0;
const core_1 = require("@cosmos-kit/core");
const isMetamaskInstalled = async () => {
    if (typeof window === 'undefined') {
        return false;
    }
    const ethereum = window.ethereum;
    if (ethereum?.isMetaMask) {
        return true;
    }
    if (document.readyState === 'complete') {
        if (ethereum?.isMetaMask) {
            return true;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (ethereum?.isMetaMask) {
                    resolve(true);
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
exports.isMetamaskInstalled = isMetamaskInstalled;
