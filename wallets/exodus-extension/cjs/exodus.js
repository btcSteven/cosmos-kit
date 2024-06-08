"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const config_1 = require("./config");
const extension_1 = require("./extension");
const exodusExtension = new extension_1.ExodusExtensionWallet(extension_1.exodusExtensionInfo, config_1.preferredEndpoints);
exports.wallets = [exodusExtension];
