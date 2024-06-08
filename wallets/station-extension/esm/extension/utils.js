import { ClientNotExistError } from '@cosmos-kit/core';
export const getStationFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const station = window.station;
    if (station) {
        return station;
    }
    if (document.readyState === 'complete') {
        if (station) {
            return station;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                const station = window.station;
                if (station) {
                    resolve(station);
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
