"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.galaxyStationExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.galaxyStationExtensionInfo = {
    name: 'galaxy-station-extension',
    prettyName: 'Galaxy Station',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: true,
    connectEventNamesOnWindow: [
        'galaxy_station_wallet_change',
        'galaxy_station_network_change',
    ],
    rejectMessage: {
        source: 'Request rejected',
    },
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chromewebstore.google.com/detail/galaxy-station-wallet/akckefnapafjbpphkefbpkpcamkoaoai',
        },
    ],
};
