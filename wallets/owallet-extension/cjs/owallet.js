"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const config_1 = require("./config");
const extension_1 = require("./extension");
const owalletExtension = new extension_1.OwalletExtensionWallet(extension_1.owalletExtensionInfo, config_1.preferredEndpoints);
exports.wallets = [owalletExtension];
