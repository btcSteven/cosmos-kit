"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFrontierFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getFrontierFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const frontier = window.frontier?.cosmos;
    if (frontier) {
        return frontier;
    }
    if (document.readyState === 'complete') {
        if (frontier) {
            return frontier;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (frontier) {
                    resolve(frontier);
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
exports.getFrontierFromExtension = getFrontierFromExtension;
