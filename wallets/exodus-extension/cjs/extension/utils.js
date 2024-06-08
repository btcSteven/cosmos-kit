"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExodusFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getExodusFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const exodus = window.exodus;
    if (exodus) {
        return exodus;
    }
    if (document.readyState === 'complete') {
        if (exodus) {
            return exodus;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (exodus) {
                    resolve(exodus);
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
exports.getExodusFromExtension = getExodusFromExtension;
