import { ClientNotExistError } from '@cosmos-kit/core';
export const getFinFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const provider = window.fin;
    if (provider) {
        return provider;
    }
    if (document.readyState === 'complete') {
        if (provider) {
            return provider;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (provider) {
                    resolve(provider);
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
