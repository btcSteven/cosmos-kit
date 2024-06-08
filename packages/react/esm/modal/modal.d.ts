import { ModalOptions, WalletModalProps } from '@cosmos-kit/core';
import { ThemeProviderProps } from '@interchain-ui/react';
import React from 'react';
import { defaultModalViews } from './components/views';
export declare type ModalCustomizationProps = {
    modalContainerClassName?: string;
    modalContentClassName?: string;
    modalChildrenClassName?: string;
    modalContentStyles?: React.CSSProperties;
};
export declare type ThemeCustomizationProps = ModalCustomizationProps & Pick<ThemeProviderProps, 'defaultTheme' | 'overrides' | 'themeDefs' | 'customTheme'>;
export declare type WalletModalComponentProps = WalletModalProps & ThemeCustomizationProps & {
    modalViews: typeof defaultModalViews;
    modalOptions?: ModalOptions;
    includeAllWalletsOnMobile?: boolean;
};
export declare function WalletModal({ isOpen, setOpen, walletRepo, modalViews, modalOptions, includeAllWalletsOnMobile, overrides, themeDefs, customTheme, defaultTheme, modalContainerClassName, modalContentClassName, modalChildrenClassName, modalContentStyles, }: WalletModalComponentProps): any;
export declare function DefaultModal({ isOpen, setOpen, walletRepo, }: WalletModalProps): any;
