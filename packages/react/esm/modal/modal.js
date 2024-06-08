import { jsx as _jsx } from "react/jsx-runtime";
import { ModalView, State, WalletStatus, } from '@cosmos-kit/core';
import { ConnectModal, ThemeProvider, } from '@interchain-ui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { defaultModalViews, } from './components/views';
export function WalletModal({ isOpen, setOpen, walletRepo, modalViews, modalOptions, includeAllWalletsOnMobile, overrides, themeDefs, customTheme, defaultTheme, 
// ==== Custom modal styles
modalContainerClassName, modalContentClassName, modalChildrenClassName, modalContentStyles, }) {
    const initialFocus = useRef();
    const [currentView, setCurrentView] = useState(ModalView.WalletList);
    const [qrState, setQRState] = useState(State.Init); // state of QRCode
    const [qrMsg, setQRMsg] = useState(''); //   message of QRCode error
    const disconnectOptions = {
        walletconnect: {
            removeAllPairings: modalOptions?.mobile?.displayQRCodeEveryTime,
        },
    };
    walletRepo?.setCallbackOptions({
        beforeConnect: { disconnect: disconnectOptions },
    });
    const current = walletRepo?.current;
    current?.client?.setActions?.({
        qrUrl: {
            state: setQRState,
            message: setQRMsg,
        },
    });
    const walletStatus = current?.walletStatus;
    const message = current?.message;
    useEffect(() => {
        if (isOpen) {
            switch (walletStatus) {
                case WalletStatus.Connecting:
                    if (qrState === State.Init) {
                        setCurrentView(ModalView.Connecting);
                    }
                    else {
                        setCurrentView(ModalView.QRCode);
                    }
                    break;
                case WalletStatus.Connected:
                    setCurrentView(ModalView.Connected);
                    break;
                case WalletStatus.Error:
                    if (qrState === State.Init) {
                        setCurrentView(ModalView.Error);
                    }
                    else {
                        setCurrentView(ModalView.QRCode);
                    }
                    break;
                case WalletStatus.Rejected:
                    setCurrentView(ModalView.Rejected);
                    break;
                case WalletStatus.NotExist: {
                    setCurrentView((prev) => prev === ModalView.Connected
                        ? ModalView.WalletList
                        : ModalView.NotExist);
                    break;
                }
                case WalletStatus.Disconnected:
                    setCurrentView(ModalView.WalletList);
                    break;
                default:
                    setCurrentView(ModalView.WalletList);
                    break;
            }
        }
    }, [qrState, walletStatus, qrMsg, message]);
    useEffect(() => {
        if (!isOpen)
            return;
        if (walletStatus === 'Connected') {
            setCurrentView(ModalView.Connected);
        }
        else {
            setCurrentView(ModalView.WalletList);
        }
    }, [isOpen]);
    const onCloseModal = useCallback(() => {
        setOpen(false);
        if (walletStatus === 'Connecting') {
            current?.disconnect(false, disconnectOptions);
        }
    }, [setOpen, walletStatus, current]);
    const onReturn = useCallback(() => {
        setCurrentView(ModalView.WalletList);
    }, [setCurrentView]);
    const wallets = useMemo(() => !includeAllWalletsOnMobile
        ? walletRepo?.platformEnabledWallets
        : walletRepo?.wallets, [walletRepo, includeAllWalletsOnMobile]);
    const modalView = useMemo(() => {
        switch (currentView) {
            case ModalView.WalletList: {
                const getImplementation = modalViews[`${currentView}`];
                return getImplementation({
                    onClose: onCloseModal,
                    wallets: wallets || [],
                    initialFocus: initialFocus,
                });
            }
            default: {
                const getImplementation = modalViews[`${currentView}`];
                if (!current) {
                    return {
                        head: null,
                        content: null,
                    };
                }
                return getImplementation({
                    onClose: onCloseModal,
                    onReturn: onReturn,
                    wallet: current,
                    options: modalOptions,
                });
            }
        }
    }, [
        currentView,
        onReturn,
        onCloseModal,
        current,
        qrState,
        walletStatus,
        walletRepo,
        wallets,
        message,
        initialFocus,
        qrMsg,
    ]);
    return (_jsx(ThemeProvider, { defaultTheme: defaultTheme, overrides: overrides, themeDefs: themeDefs, customTheme: customTheme, children: _jsx(ConnectModal, { isOpen: isOpen, header: modalView.head, onClose: onCloseModal, modalContainerClassName: modalContainerClassName, modalContentClassName: modalContentClassName, modalChildrenClassName: modalChildrenClassName, modalContentStyles: modalContentStyles, children: modalView.content }) }));
}
export function DefaultModal({ isOpen, setOpen, walletRepo, }) {
    return (_jsx(WalletModal, { isOpen: isOpen, setOpen: setOpen, walletRepo: walletRepo, modalViews: defaultModalViews }));
}
