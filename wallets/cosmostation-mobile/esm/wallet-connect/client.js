import { WCClient } from '@cosmos-kit/walletconnect';
export class CosmostationClient extends WCClient {
    constructor(walletInfo) {
        super(walletInfo);
    }
}
