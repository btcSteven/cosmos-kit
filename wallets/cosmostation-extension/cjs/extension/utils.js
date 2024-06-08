"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCosmostationFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getCosmostationFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const cosmostation = window.cosmostation;
    if (cosmostation) {
        return cosmostation;
    }
    if (document.readyState === 'complete') {
        if (cosmostation) {
            return cosmostation;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                const cosmostation = window.cosmostation;
                if (cosmostation) {
                    resolve(cosmostation);
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
exports.getCosmostationFromExtension = getCosmostationFromExtension;
