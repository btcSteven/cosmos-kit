import { morkExtensionInfo, MorkExtensionWallet } from './extension';

const morkExtension = new MorkExtensionWallet(morkExtensionInfo);

export const wallets = [morkExtension];
