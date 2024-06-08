"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const compassExtension = new extension_1.CompassExtensionWallet(extension_1.compassExtensionInfo);
exports.wallets = [compassExtension];
