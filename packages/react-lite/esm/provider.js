import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Logger, State, WalletManager, } from '@cosmos-kit/core';
import { createContext, useEffect, useMemo, useState } from 'react';
export const walletContext = createContext(null);
export function ChainProvider({ chains, assetLists, wallets, walletModal: ProvidedWalletModal, throwErrors = false, subscribeConnectEvents = true, defaultNameService = 'icns', walletConnectOptions, signerOptions, endpointOptions, sessionOptions, logLevel = 'WARN', allowedIframeParentOrigins = [
    'https://app.osmosis.zone',
    'https://daodao.zone',
    'https://dao.daodao.zone',
], children, }) {
    const logger = useMemo(() => new Logger(logLevel), []);
    const walletManager = useMemo(() => {
        return new WalletManager(chains, wallets, logger, throwErrors, subscribeConnectEvents, allowedIframeParentOrigins, assetLists, defaultNameService, walletConnectOptions, signerOptions, endpointOptions, sessionOptions);
    }, []);
    const [isViewOpen, setViewOpen] = useState(false);
    const [viewWalletRepo, setViewWalletRepo] = useState();
    const [data, setData] = useState();
    const [state, setState] = useState(State.Init);
    const [msg, setMsg] = useState();
    const [, setClientState] = useState(State.Init);
    const [, setClientMsg] = useState();
    const [render, forceRender] = useState(0);
    logger.debug('[provider.tsx] data:', data);
    logger.debug('[provider.tsx] state:', state);
    logger.debug('[provider.tsx] message:', msg);
    walletManager.setActions({
        viewOpen: setViewOpen,
        viewWalletRepo: setViewWalletRepo,
        data: setData,
        state: setState,
        message: setMsg,
    });
    walletManager.walletRepos.forEach((wr) => {
        wr.setActions({
            viewOpen: setViewOpen,
            viewWalletRepo: setViewWalletRepo,
            render: forceRender,
        });
        wr.wallets.forEach((w) => {
            w.setActions({
                data: setData,
                state: setState,
                message: setMsg,
            });
        });
    });
    walletManager.mainWallets.forEach((w) => {
        w.setActions({
            data: setData,
            state: setState,
            message: setMsg,
            clientState: setClientState,
            clientMessage: setClientMsg,
        });
    });
    useEffect(() => {
        walletManager.onMounted();
        return () => {
            setViewOpen(false);
            walletManager.onUnmounted();
        };
    }, [render]);
    return (_jsxs(walletContext.Provider, { value: { walletManager, modalProvided: Boolean(ProvidedWalletModal) }, children: [ProvidedWalletModal && (_jsx(ProvidedWalletModal, { isOpen: isViewOpen, setOpen: setViewOpen, walletRepo: viewWalletRepo })), children] }));
}
