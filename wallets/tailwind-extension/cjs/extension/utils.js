"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletFromWindow = void 0;
const core_1 = require("@cosmos-kit/core");
const getWalletFromWindow = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const tailwind = window.tailwind;
    if (tailwind) {
        return tailwind;
    }
    if (document.readyState === 'complete') {
        if (tailwind) {
            return tailwind;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                // re-declare variable inside the event listener
                const tailwind = window.tailwind;
                if (tailwind) {
                    resolve(tailwind);
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
exports.getWalletFromWindow = getWalletFromWindow;
