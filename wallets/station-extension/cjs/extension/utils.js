"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStationFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getStationFromExtension = async () => {
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
            throw core_1.ClientNotExistError;
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
                    reject(core_1.ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
exports.getStationFromExtension = getStationFromExtension;
