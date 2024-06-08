import { Wallet } from '@cosmos-kit/core';

import { ICON } from '../constant';

export const morkExtensionInfo: Wallet = {
  name: 'mork-extension',
  prettyName: 'Mork',
  logo: ICON,
  mode: 'extension',
  mobileDisabled: () =>
    !('mork' in window || /MorkCosmos/i.test(navigator.userAgent)),
  rejectMessage: {
    source: 'Request rejected',
  },
  connectEventNamesOnWindow: ['mork_keystorechange'],
  downloads: [
    {
      device: 'desktop',
      browser: 'chrome',
      link: 'https://chrome.google.com/webstore/detail/mork-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg',
    },
    {
      link: 'https://chrome.google.com/webstore/detail/mork-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg',
    },
  ],
};
