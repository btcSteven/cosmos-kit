import { ClientNotExistError } from '@cosmos-kit/core';
export const getNinjiFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const ninji = window.ninji;
    if (ninji) {
        return ninji;
    }
    if (document.readyState === 'complete') {
        if (ninji) {
            return ninji;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (ninji) {
                    resolve(ninji);
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
