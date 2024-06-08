"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVectisFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getVectisFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const vectis = window.vectis?.cosmos;
    if (vectis) {
        return vectis;
    }
    if (document.readyState === 'complete') {
        if (vectis) {
            return vectis;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (vectis) {
                    resolve(vectis);
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
exports.getVectisFromExtension = getVectisFromExtension;
