import { WCWallet } from '@cosmos-kit/walletconnect';
import { ChainTrustMobile } from './chain-wallet';
import { TrustClient } from './client';
export class TrustMobileWallet extends WCWallet {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, ChainTrustMobile, TrustClient);
        this.preferredEndpoints = preferredEndpoints;
    }
}
