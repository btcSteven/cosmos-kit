"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIframe = void 0;
const core_1 = require("@cosmos-kit/core");
const cosmiframe_1 = require("@dao-dao/cosmiframe");
const react_1 = require("react");
const useWallet_1 = require("./useWallet");
const useIframe = ({ walletName, metadata, walletClientOverrides, signerOverrides, origins, } = {}) => {
    const wallet = (0, useWallet_1.useWallet)(walletName).mainWallet;
    const [iframe, setIframe] = (0, react_1.useState)(null);
    // Memoize these values with refs so the listener always uses their latest
    // values without needing to reset.
    const walletClientOverridesRef = (0, react_1.useRef)(walletClientOverrides);
    walletClientOverridesRef.current = walletClientOverrides;
    const signerOverridesRef = (0, react_1.useRef)(signerOverrides);
    signerOverridesRef.current = signerOverrides;
    // Broadcast keystore change event to iframe wallet.
    (0, react_1.useEffect)(() => {
        const notifyIframe = () => {
            iframe?.contentWindow.postMessage({
                event: core_1.COSMIFRAME_KEYSTORECHANGE_EVENT,
            }, '*');
        };
        // Notify inner window of keystore change on any wallet client change
        // (likely either connection or disconnection).
        notifyIframe();
        if (!wallet || typeof window === 'undefined') {
            return;
        }
        // Notify inner window of keystore change on any wallet connect event.
        wallet.walletInfo.connectEventNamesOnWindow?.forEach((eventName) => {
            window.addEventListener(eventName, notifyIframe);
        });
        wallet.walletInfo.connectEventNamesOnClient?.forEach(async (eventName) => {
            wallet.client?.on?.(eventName, notifyIframe);
        });
        return () => {
            wallet.walletInfo.connectEventNamesOnWindow?.forEach((eventName) => {
                window.removeEventListener(eventName, notifyIframe);
            });
            wallet.walletInfo.connectEventNamesOnClient?.forEach(async (eventName) => {
                wallet.client?.off?.(eventName, notifyIframe);
            });
        };
    }, [wallet, iframe]);
    // Whenever wallet changes, broadcast keystore change event to iframe wallet.
    (0, react_1.useEffect)(() => {
        iframe?.contentWindow.postMessage({
            event: core_1.COSMIFRAME_KEYSTORECHANGE_EVENT,
        }, '*');
    }, [wallet, iframe]);
    (0, react_1.useEffect)(() => {
        if (!iframe) {
            return;
        }
        const removeListener = cosmiframe_1.Cosmiframe.listen({
            iframe,
            target: wallet?.client || {},
            getOfflineSignerDirect: wallet?.client.getOfflineSignerDirect.bind(wallet.client) ||
                (() => Promise.reject(core_1.COSMIFRAME_NOT_CONNECTED_MESSAGE)),
            getOfflineSignerAmino: wallet?.client.getOfflineSignerAmino.bind(wallet.client) ||
                (() => Promise.reject(core_1.COSMIFRAME_NOT_CONNECTED_MESSAGE)),
            nonSignerOverrides: () => ({
                ...walletClientOverridesRef.current,
                // Override connect to return wallet info.
                connect: async (...params) => {
                    if (walletClientOverridesRef.current?.connect) {
                        return await walletClientOverridesRef.current.connect(params[0], params[1]);
                    }
                    else if (wallet?.client?.connect) {
                        await wallet.client.connect(params[0], params[1]);
                    }
                    else {
                        return {
                            type: 'error',
                            error: core_1.COSMIFRAME_NOT_CONNECTED_MESSAGE,
                        };
                    }
                },
            }),
            signerOverrides: () => signerOverridesRef.current,
            origins,
            metadata: {
                name: metadata?.name || `${wallet.walletInfo.prettyName} (Outer Wallet)`,
                imageUrl: metadata?.imageUrl ||
                    (wallet.walletInfo.logo
                        ? typeof wallet.walletInfo.logo === 'string'
                            ? wallet.walletInfo.logo
                            : 'major' in wallet.walletInfo.logo
                                ? wallet.walletInfo.logo.major
                                : undefined
                        : undefined),
            },
        });
        return removeListener;
    }, [iframe, wallet, metadata, origins]);
    const iframeRef = (0, react_1.useCallback)((iframe) => setIframe(iframe), []);
    return {
        wallet,
        iframeRef,
    };
};
exports.useIframe = useIframe;
