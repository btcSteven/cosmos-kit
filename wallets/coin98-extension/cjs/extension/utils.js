"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoin98FromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getCoin98FromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const provider = window.coin98?.keplr;
    if (provider) {
        return provider;
    }
    if (document.readyState === 'complete') {
        if (provider) {
            return provider;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (provider) {
                    resolve(provider);
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
exports.getCoin98FromExtension = getCoin98FromExtension;
