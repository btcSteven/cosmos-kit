import { WCClient } from '@cosmos-kit/walletconnect';
export class LeapClient extends WCClient {
    constructor(walletInfo) {
        super(walletInfo);
    }
}
