"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCosmjsFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getCosmjsFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const cosmjs = window.cosmjs;
    if (cosmjs) {
        return cosmjs;
    }
    if (document.readyState === 'complete') {
        if (cosmjs) {
            return cosmjs;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target && event.target.readyState === 'complete') {
                if (cosmjs) {
                    resolve(cosmjs);
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
exports.getCosmjsFromExtension = getCosmjsFromExtension;
