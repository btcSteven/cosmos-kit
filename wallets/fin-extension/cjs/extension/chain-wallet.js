"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFinExtension = void 0;
const core_1 = require("@cosmos-kit/core");
class ChainFinExtension extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainFinExtension = ChainFinExtension;
