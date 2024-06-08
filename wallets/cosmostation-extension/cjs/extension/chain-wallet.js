"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainCosmostationExtension = void 0;
/* eslint-disable no-console */
const core_1 = require("@cosmos-kit/core");
class ChainCosmostationExtension extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainCosmostationExtension = ChainCosmostationExtension;
