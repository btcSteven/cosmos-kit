"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getFinFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const provider = window.fin;
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
exports.getFinFromExtension = getFinFromExtension;
