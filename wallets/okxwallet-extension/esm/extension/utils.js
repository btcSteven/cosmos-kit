import { ClientNotExistError } from '@cosmos-kit/core';
export const getOkxwalletFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const okxwallet = window.okxwallet?.keplr;
    if (okxwallet) {
        return okxwallet;
    }
    if (document.readyState === 'complete') {
        if (okxwallet) {
            return okxwallet;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (okxwallet) {
                    resolve(okxwallet);
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
