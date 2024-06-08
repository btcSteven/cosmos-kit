"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeapSocialLoginInfo = void 0;
const constant_1 = require("./constant");
exports.LeapSocialLoginInfo = {
    name: 'leap-capsule-social-login',
    prettyName: 'Sign In with Email',
    logo: `${constant_1.LEAP_SOCIAL_LOGIN_LOGO}`,
    mode: 'extension',
    mobileDisabled: false,
    rejectMessage: {
        source: 'Request rejected',
    },
    downloads: [],
};
