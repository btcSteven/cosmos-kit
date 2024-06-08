import { WCWallet } from '@cosmos-kit/walletconnect';
import { ChainOmniMobile } from './chain-wallet';
import { OmniClient } from './client';
export class OmniMobileWallet extends WCWallet {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, ChainOmniMobile, OmniClient);
        this.preferredEndpoints = preferredEndpoints;
    }
}
