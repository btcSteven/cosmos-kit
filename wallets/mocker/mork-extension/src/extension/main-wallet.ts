import { Wallet, EndpointOptions } from '@cosmos-kit/core';
import { MainWalletBase } from '@cosmos-kit/core';

import { ChainMorkExtension } from './chain-wallet';
import { MorkClient } from './client';
import { getMorkFromExtension } from './utils';

export class MorkExtensionWallet extends MainWalletBase {
  constructor(
    walletInfo: Wallet,
    preferredEndpoints?: EndpointOptions['endpoints']
  ) {
    super(walletInfo, ChainMorkExtension);
    this.preferredEndpoints = preferredEndpoints;
  }

  async initClient() {
    this.initingClient();
    try {
      const mork = await getMorkFromExtension();
      this.initClientDone(mork ? new MorkClient(mork) : undefined);
    } catch (error) {
      this.initClientError(error);
    }
  }
}
