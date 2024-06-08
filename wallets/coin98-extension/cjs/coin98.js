"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const config_1 = require("./config");
const extension_1 = require("./extension");
const coin98Extension = new extension_1.Coin98ExtensionWallet(extension_1.Coin98ExtensionInfo, config_1.preferredEndpoints);
exports.wallets = [coin98Extension];
