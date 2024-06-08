"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAndListenOnce = exports.listenOnce = exports.getChainWalletContext = void 0;
const core_1 = require("@cosmos-kit/core");
function getChainWalletContext(chainId, wallet, sync = true) {
    const walletAssert = (func, params = [], name) => {
        if (!wallet) {
            throw new Error(`Wallet is undefined. Please choose a wallet to connect first.`);
        }
        if (!func) {
            throw new Error(`Function ${name} not implemented by ${wallet?.walletInfo.prettyName} yet.`);
        }
        return func(...params);
    };
    function clientMethodAssert(func, params = [], name) {
        if (!wallet) {
            throw new Error(`Wallet is undefined. Please choose a wallet to connect first.`);
        }
        if (!wallet?.client) {
            throw new Error(`Wallet Client is undefined.`);
        }
        if (!func) {
            throw new Error(`Function ${name} not implemented by ${wallet?.walletInfo.prettyName} Client yet.`);
        }
        return func(...params);
    }
    const status = wallet?.walletStatus || core_1.WalletStatus.Disconnected;
    return {
        chainWallet: wallet,
        chain: wallet?.chainRecord.chain,
        assets: wallet?.chainRecord.assetList,
        logoUrl: wallet?.chainLogoUrl,
        wallet: wallet?.walletInfo,
        address: wallet?.address,
        username: wallet?.username,
        message: wallet ? wallet.message : 'No wallet is connected walletly.',
        status,
        isWalletDisconnected: status === 'Disconnected',
        isWalletConnecting: status === 'Connecting',
        isWalletConnected: status === 'Connected',
        isWalletRejected: status === 'Rejected',
        isWalletNotExist: status === 'NotExist',
        isWalletError: status === 'Error',
        connect: () => walletAssert(wallet?.connect, [void 0, sync], 'connect'),
        disconnect: (options) => walletAssert(wallet?.disconnect, [void 0, sync, options], 'disconnect'),
        getRpcEndpoint: (isLazy) => walletAssert(wallet?.getRpcEndpoint, [isLazy], 'getRpcEndpoint'),
        getRestEndpoint: (isLazy) => walletAssert(wallet?.getRestEndpoint, [isLazy], 'getRestEndpoint'),
        getStargateClient: () => walletAssert(wallet?.getStargateClient, [], 'getStargateClient'),
        getCosmWasmClient: () => walletAssert(wallet?.getCosmWasmClient, [], 'getCosmWasmClient'),
        getSigningStargateClient: () => walletAssert(wallet?.getSigningStargateClient, [], 'getSigningStargateClient'),
        getSigningCosmWasmClient: () => walletAssert(wallet?.getSigningCosmWasmClient, [], 'getSigningCosmWasmClient'),
        getNameService: () => walletAssert(wallet?.getNameService, [], 'getNameService'),
        estimateFee: (...params) => walletAssert(wallet?.estimateFee, params, 'estimateFee'),
        sign: (...params) => walletAssert(wallet?.sign, params, 'sign'),
        broadcast: (...params) => walletAssert(wallet?.broadcast, params, 'broadcast'),
        signAndBroadcast: (...params) => walletAssert(wallet?.signAndBroadcast, params, 'signAndBroadcast'),
        qrUrl: wallet?.client?.qrUrl,
        appUrl: wallet?.client?.appUrl,
        defaultSignOptions: wallet?.client?.defaultSignOptions,
        setDefaultSignOptions: (...params) => clientMethodAssert(wallet?.client?.setDefaultSignOptions.bind(wallet.client), [...params], 'setDefaultSignOptions'),
        enable: () => clientMethodAssert(wallet?.client?.enable.bind(wallet.client), [chainId], 'enable'),
        suggestToken: (...params) => clientMethodAssert(wallet?.client?.suggestToken.bind(wallet.client), [...params], 'suggestToken'),
        getAccount: () => clientMethodAssert(wallet?.client?.getAccount.bind(wallet.client), [chainId], 'getAccount'),
        getOfflineSigner: () => clientMethodAssert(wallet?.client?.getOfflineSigner.bind(wallet.client), [chainId, wallet?.preferredSignType], 'getOfflineSigner'),
        getOfflineSignerAmino: () => clientMethodAssert(wallet?.client?.getOfflineSignerAmino.bind(wallet.client), [chainId], 'getOfflineSignerAmino'),
        getOfflineSignerDirect: () => clientMethodAssert(wallet?.client?.getOfflineSignerDirect.bind(wallet.client), [chainId], 'getOfflineSignerDirect'),
        signAmino: (...params) => clientMethodAssert(wallet?.client?.signAmino.bind(wallet.client), [chainId, ...params], 'signAmino'),
        signDirect: (...params) => clientMethodAssert(wallet?.client?.signDirect.bind(wallet.client), [chainId, ...params], 'signDirect'),
        signArbitrary: (...params) => clientMethodAssert(wallet?.client?.signArbitrary.bind(wallet.client), [chainId, ...params], 'signArbitrary'),
        sendTx: (...params) => clientMethodAssert(wallet?.client?.sendTx.bind(wallet.client), [chainId, ...params], 'sendTx'),
    };
}
exports.getChainWalletContext = getChainWalletContext;
// Listen for a message and remove the listener if the callback returns true or
// if it throws an error.
const listenOnce = (callback) => {
    const listener = async ({ data }) => {
        let remove;
        try {
            remove = await callback(data);
        }
        catch (error) {
            console.error(error);
            remove = true;
        }
        if (remove) {
            window.removeEventListener('message', listener);
        }
    };
    window.addEventListener('message', listener);
};
exports.listenOnce = listenOnce;
// Send message to iframe and listen for a response. Returns a promise that
// resolves when the callback returns true and rejects if it throws an error.
const sendAndListenOnce = (iframe, message, callback) => new Promise((resolve, reject) => {
    // Add one-time listener that waits for a response.
    (0, exports.listenOnce)(async (data) => {
        try {
            if (await callback(data)) {
                resolve();
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            reject(err);
            return true;
        }
    });
    // Send the message to the iframe.
    iframe.contentWindow.postMessage(message);
});
exports.sendAndListenOnce = sendAndListenOnce;
