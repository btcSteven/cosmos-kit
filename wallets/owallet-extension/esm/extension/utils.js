import { ClientNotExistError } from '@cosmos-kit/core';
export const getOWalletFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    //@ts-ignore
    const owallet = window.owallet;
    if (owallet) {
        return owallet;
    }
    if (document.readyState === 'complete') {
        if (owallet) {
            return owallet;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                //@ts-ignore
                const owallet = window.owallet;
                if (owallet) {
                    resolve(owallet);
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
