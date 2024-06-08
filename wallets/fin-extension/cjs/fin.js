"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const config_1 = require("./config");
const extension_1 = require("./extension");
const finExtension = new extension_1.FinExtensionWallet(extension_1.FinExtensionInfo, config_1.preferredEndpoints);
exports.wallets = [finExtension];
