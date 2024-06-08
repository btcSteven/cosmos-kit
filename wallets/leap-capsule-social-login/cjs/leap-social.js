"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const cosmos_social_login_capsule_provider_1 = require("@leapwallet/cosmos-social-login-capsule-provider");
const main_wallet_1 = require("./main-wallet");
const leapSocial = new main_wallet_1.LeapCapsuleWallet(cosmos_social_login_capsule_provider_1.LeapCapsuleInfo);
exports.wallets = [leapSocial];
