import { ClientNotExistError } from '@cosmos-kit/core';
export const isMetamaskInstalled = async () => {
    if (typeof window === 'undefined') {
        return false;
    }
    const ethereum = window.ethereum;
    if (ethereum?.isMetaMask) {
        return true;
    }
    if (document.readyState === 'complete') {
        if (ethereum?.isMetaMask) {
            return true;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (ethereum?.isMetaMask) {
                    resolve(true);
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
