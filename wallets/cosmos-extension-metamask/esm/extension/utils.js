import { ClientNotExistError } from '@cosmos-kit/core';
export const getSnapProviderFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const cosmos = window.cosmos;
    if (cosmos) {
        return cosmos;
    }
    if (document.readyState === 'complete') {
        if (cosmos) {
            return cosmos;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (cosmos) {
                    resolve(cosmos);
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
