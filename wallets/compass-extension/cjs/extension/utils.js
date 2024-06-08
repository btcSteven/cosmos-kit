"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompassFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getCompassFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const compass = window.compass;
    if (compass) {
        return compass;
    }
    if (document.readyState === 'complete') {
        if (compass) {
            return compass;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (compass) {
                    resolve(compass);
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
exports.getCompassFromExtension = getCompassFromExtension;
