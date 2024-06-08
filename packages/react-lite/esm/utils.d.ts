import { ChainWalletBase, ChainWalletContext } from '@cosmos-kit/core';
export declare function getChainWalletContext(chainId: string, wallet?: ChainWalletBase, sync?: boolean): ChainWalletContext;
export declare const listenOnce: (callback: (message: unknown) => boolean | Promise<boolean>) => void;
export declare const sendAndListenOnce: (iframe: HTMLIFrameElement, message: unknown, callback: (message: unknown) => boolean | Promise<boolean>) => Promise<void>;
