"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainExodusExtension = void 0;
const core_1 = require("@cosmos-kit/core");
class ChainExodusExtension extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainExodusExtension = ChainExodusExtension;
