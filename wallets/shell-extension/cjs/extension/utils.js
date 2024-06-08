"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShellFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getShellFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const shell = window.shellwallet;
    if (shell) {
        return shell;
    }
    if (document.readyState === 'complete') {
        if (shell) {
            return shell;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (shell) {
                    resolve(shell);
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
exports.getShellFromExtension = getShellFromExtension;
