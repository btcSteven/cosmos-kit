"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainXDEFIExtension = void 0;
const core_1 = require("@cosmos-kit/core");
class ChainXDEFIExtension extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainXDEFIExtension = ChainXDEFIExtension;
