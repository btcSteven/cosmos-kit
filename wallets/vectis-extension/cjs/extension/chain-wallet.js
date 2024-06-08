"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainVectisExtension = void 0;
const core_1 = require("@cosmos-kit/core");
class ChainVectisExtension extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainVectisExtension = ChainVectisExtension;
