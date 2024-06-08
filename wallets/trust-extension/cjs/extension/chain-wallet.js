"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainTrustExtension = void 0;
const core_1 = require("@cosmos-kit/core");
class ChainTrustExtension extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainTrustExtension = ChainTrustExtension;
