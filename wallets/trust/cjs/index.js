"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const trust_extension_1 = require("@cosmos-kit/trust-extension");
const trust_mobile_1 = require("@cosmos-kit/trust-mobile");
exports.wallets = [...trust_extension_1.wallets, ...trust_mobile_1.wallets];
