"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const galaxyStationExtension = new extension_1.GalaxyStationExtensionWallet(extension_1.galaxyStationExtensionInfo);
exports.wallets = [galaxyStationExtension];
