"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmostationClient = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
class CosmostationClient extends walletconnect_1.WCClient {
    constructor(walletInfo) {
        super(walletInfo);
    }
}
exports.CosmostationClient = CosmostationClient;
