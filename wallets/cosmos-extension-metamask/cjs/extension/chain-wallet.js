"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainCosmosExtensionMetamaskSnap = void 0;
const core_1 = require("@cosmos-kit/core");
class ChainCosmosExtensionMetamaskSnap extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainCosmosExtensionMetamaskSnap = ChainCosmosExtensionMetamaskSnap;
