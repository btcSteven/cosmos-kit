import { AssetList, Chain } from '@chain-registry/types';
import { ChainName, EndpointOptions, LogLevel, MainWalletBase, ModalOptions, NameServiceName, SessionOptions, SignerOptions, WalletConnectOptions, WalletModalProps } from '@cosmos-kit/core';
import { ReactNode } from 'react';
import { ThemeCustomizationProps } from './modal';
import { defaultModalViews } from './modal/components/views';
export declare const ChainProvider: ({ chains, assetLists, wallets, walletModal, modalViews, throwErrors, subscribeConnectEvents, defaultNameService, walletConnectOptions, signerOptions, endpointOptions, sessionOptions, logLevel, allowedIframeParentOrigins, children, modalTheme, modalOptions, }: {
    chains: (Chain | ChainName)[];
    assetLists?: AssetList[];
    wallets: MainWalletBase[];
    walletModal?: (props: WalletModalProps) => JSX.Element;
    modalViews?: typeof defaultModalViews;
    throwErrors?: boolean | 'connect_only';
    subscribeConnectEvents?: boolean;
    defaultNameService?: NameServiceName;
    walletConnectOptions?: WalletConnectOptions;
    signerOptions?: SignerOptions;
    endpointOptions?: EndpointOptions;
    sessionOptions?: SessionOptions;
    logLevel?: LogLevel;
    /**
     * Origins to allow wrapping this app in an iframe and connecting to this
     * Cosmos Kit instance.
     *
     * Defaults to Osmosis and DAO DAO.
     */
    allowedIframeParentOrigins?: string[];
    children: ReactNode;
    modalTheme?: ThemeCustomizationProps;
    modalOptions?: ModalOptions;
}) => any;
