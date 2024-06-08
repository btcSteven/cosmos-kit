import { ClientNotExistError } from '@cosmos-kit/core';
export const getXDEFIFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const xdefi = window?.xfi?.keplr;
    if (xdefi && !xdefi.isXDEFI) {
        throw ClientNotExistError;
    }
    if (xdefi) {
        return xdefi;
    }
    if (document.readyState === 'complete') {
        if (xdefi) {
            return xdefi;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                const xdefi = window?.xfi?.keplr;
                if (xdefi) {
                    resolve(xdefi);
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
