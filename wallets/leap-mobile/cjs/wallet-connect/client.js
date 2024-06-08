"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeapClient = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
class LeapClient extends walletconnect_1.WCClient {
    constructor(walletInfo) {
        super(walletInfo);
    }
}
exports.LeapClient = LeapClient;
