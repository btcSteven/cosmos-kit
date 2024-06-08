import { ChainWC } from '@cosmos-kit/walletconnect';
import { OmniClient } from './client';
export class ChainOmniMobile extends ChainWC {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo, OmniClient);
    }
}
