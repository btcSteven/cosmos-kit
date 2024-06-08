"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeapFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getLeapFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const leap = window.leap;
    if (leap) {
        return leap;
    }
    if (document.readyState === 'complete') {
        if (leap) {
            return leap;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (leap) {
                    resolve(leap);
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
exports.getLeapFromExtension = getLeapFromExtension;
