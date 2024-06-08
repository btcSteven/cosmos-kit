"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const stationExtension = new extension_1.StationExtensionWallet(extension_1.stationExtensionInfo);
exports.wallets = [stationExtension];
