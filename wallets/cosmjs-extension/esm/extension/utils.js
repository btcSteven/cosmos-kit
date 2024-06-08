import { ClientNotExistError } from '@cosmos-kit/core';
export const getCosmjsFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const cosmjs = window.cosmjs;
    if (cosmjs) {
        return cosmjs;
    }
    if (document.readyState === 'complete') {
        if (cosmjs) {
            return cosmjs;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target && event.target.readyState === 'complete') {
                if (cosmjs) {
                    resolve(cosmjs);
                }
                else {
                    reject(ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
