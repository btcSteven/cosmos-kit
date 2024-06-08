import { WCWallet } from '@cosmos-kit/walletconnect';
import { ChainLeapMobile } from './chain-wallet';
import { LeapClient } from './client';
export class LeapMobileWallet extends WCWallet {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, ChainLeapMobile, LeapClient);
        this.preferredEndpoints = preferredEndpoints;
    }
}
