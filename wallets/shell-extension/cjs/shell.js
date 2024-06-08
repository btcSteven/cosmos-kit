"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const config_1 = require("./config");
const extension_1 = require("./extension");
const shellExtension = new extension_1.ShellExtensionWallet(extension_1.shellExtensionInfo, config_1.preferredEndpoints);
exports.wallets = [shellExtension];
