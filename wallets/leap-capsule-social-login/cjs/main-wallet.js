"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeapCapsuleWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const cosmos_social_login_capsule_provider_1 = require("@leapwallet/cosmos-social-login-capsule-provider");
class LeapCapsuleWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainCosmosSocial);
    }
    async initClient() {
        this.initingClient();
        try {
            this.initClientDone(new client_1.CosmosCapsuleClient({ loginProvider: new cosmos_social_login_capsule_provider_1.CapsuleProvider({ apiKey: process.env.CAPSULE_KEY || process.env.NEXT_PUBLIC_CAPSULE_KEY, env: process.env.CAPSULE_ENV || process.env.NEXT_PUBLIC_CAPSULE_ENV }) }));
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.LeapCapsuleWallet = LeapCapsuleWallet;
