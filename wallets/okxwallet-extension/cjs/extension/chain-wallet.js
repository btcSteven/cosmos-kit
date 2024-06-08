"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainOkxwalletExtension = void 0;
const core_1 = require("@cosmos-kit/core");
class ChainOkxwalletExtension extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainOkxwalletExtension = ChainOkxwalletExtension;
