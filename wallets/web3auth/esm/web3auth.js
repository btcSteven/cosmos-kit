import { Web3AuthWallet, web3AuthWalletInfo } from './extension';
export const makeWeb3AuthWallets = (options) => options.loginMethods.map(({ provider, name, logo }) => new Web3AuthWallet({
    ...web3AuthWalletInfo,
    name: web3AuthWalletInfo.name + '_' + provider,
    prettyName: name,
    logo,
    options: {
        ...options,
        loginProvider: provider,
    },
}));
