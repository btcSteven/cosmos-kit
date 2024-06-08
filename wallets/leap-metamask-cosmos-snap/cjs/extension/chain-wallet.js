"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainMetamaskCosmosSnap = void 0;
const core_1 = require("@cosmos-kit/core");
class ChainMetamaskCosmosSnap extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainMetamaskCosmosSnap = ChainMetamaskCosmosSnap;
