import { ClientNotExistError } from '@cosmos-kit/core';
export const getInitiaFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const initia = window.initia;
    if (initia) {
        return initia;
    }
    if (document.readyState === 'complete') {
        if (initia) {
            return initia;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                const initia = window.initia;
                if (initia) {
                    resolve(initia);
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
