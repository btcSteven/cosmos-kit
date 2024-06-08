"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNinjiFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getNinjiFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const ninji = window.ninji;
    if (ninji) {
        return ninji;
    }
    if (document.readyState === 'complete') {
        if (ninji) {
            return ninji;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (ninji) {
                    resolve(ninji);
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
exports.getNinjiFromExtension = getNinjiFromExtension;
