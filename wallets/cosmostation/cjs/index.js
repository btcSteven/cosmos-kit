"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const cosmostation_extension_1 = require("@cosmos-kit/cosmostation-extension");
const cosmostation_mobile_1 = require("@cosmos-kit/cosmostation-mobile");
exports.wallets = [...cosmostation_extension_1.wallets, ...cosmostation_mobile_1.wallets];
