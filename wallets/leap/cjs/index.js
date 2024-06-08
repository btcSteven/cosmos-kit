"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const leap_extension_1 = require("@cosmos-kit/leap-extension");
const leap_mobile_1 = require("@cosmos-kit/leap-mobile");
const leap_metamask_cosmos_snap_1 = require("@cosmos-kit/leap-metamask-cosmos-snap");
exports.wallets = [...leap_extension_1.wallets, ...leap_mobile_1.wallets, ...leap_metamask_cosmos_snap_1.wallets];
