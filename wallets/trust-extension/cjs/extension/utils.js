"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrustFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getTrustFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const trust = window.trustwallet?.cosmos;
    if (trust) {
        return trust;
    }
    if (document.readyState === 'complete') {
        if (trust) {
            return trust;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (trust) {
                    resolve(trust);
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
exports.getTrustFromExtension = getTrustFromExtension;
