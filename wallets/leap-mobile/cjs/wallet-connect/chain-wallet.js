"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainLeapMobile = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
const client_1 = require("./client");
class ChainLeapMobile extends walletconnect_1.ChainWC {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo, client_1.LeapClient);
    }
}
exports.ChainLeapMobile = ChainLeapMobile;
