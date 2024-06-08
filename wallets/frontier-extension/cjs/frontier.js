"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const frontierExtension = new extension_1.FrontierExtensionWallet(extension_1.frontierExtensionInfo);
exports.wallets = [frontierExtension];
