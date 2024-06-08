"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitiaFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getInitiaFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const initia = window.initia;
    if (initia) {
        return initia;
    }
    if (document.readyState === 'complete') {
        if (initia) {
            return initia;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                const initia = window.initia;
                if (initia) {
                    resolve(initia);
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
exports.getInitiaFromExtension = getInitiaFromExtension;
