import { OfflineAminoSigner } from '@cosmjs/amino';
import { OfflineDirectSigner } from '@cosmjs/proto-signing';
import { MainWalletBase, WalletClient, WalletName } from '@cosmos-kit/core';
import { OverrideHandler, ParentMetadata } from '@dao-dao/cosmiframe';
import { RefCallback } from 'react';
export declare type FunctionKeys<T> = {
    [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? K : never;
}[keyof T];
export declare type UseIframeOptions = {
    /**
     * Optionally attempt to use a specific wallet. Otherwise get the first active
     * wallet.
     */
    walletName?: WalletName;
    /**
     * Optionally set the metadata that represents this parent to the iframe.
     */
    metadata?: ParentMetadata;
    /**
     * If defined, the relevant override of a wallet client function will be
     * called with the parameters. The return value determines how the iframe
     * should handle the function. By default, if nothing is returned, an error
     * will be thrown with the message "Handled by outer wallet."
     */
    walletClientOverrides?: Partial<{
        [K in FunctionKeys<WalletClient>]: (...params: Parameters<WalletClient[K]>) => OverrideHandler | Promise<OverrideHandler>;
    }>;
    /**
     * If defined, the relevant override of a direct or amino signer will be
     * called with the parameters. The return value determines how the iframe
     * should handle the function. By default, if nothing is returned, an error
     * will be thrown with the message "Handled by outer wallet."
     */
    signerOverrides?: Partial<{
        [K in keyof (OfflineAminoSigner & OfflineDirectSigner)]: (...params: Parameters<(OfflineAminoSigner & OfflineDirectSigner)[K]>) => OverrideHandler | Promise<OverrideHandler>;
    }>;
    /**
     * Optionally only respond to requests from iframes of specific origin. If
     * undefined or empty, all origins are allowed.
     */
    origins?: string[];
};
export declare const useIframe: ({ walletName, metadata, walletClientOverrides, signerOverrides, origins, }?: UseIframeOptions) => {
    wallet: MainWalletBase;
    iframeRef: RefCallback<HTMLIFrameElement>;
};
