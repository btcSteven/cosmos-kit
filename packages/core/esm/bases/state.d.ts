import { Actions, DappEnv, Data, Mutable, State, StateActions, WalletStatus } from '../types';
import type { Logger } from '../utils';
export declare class StateBase {
    protected _mutable: Mutable<Data>;
    actions?: StateActions<Data>;
    protected _env?: DappEnv;
    logger?: Logger;
    constructor();
    get env(): DappEnv;
    setEnv(env?: DappEnv): void;
    setActions: (actions: Actions) => void;
    get isMobile(): boolean;
    get mutable(): Mutable<Data>;
    get state(): State;
    get isInit(): boolean;
    get isDone(): boolean;
    get isError(): boolean;
    get isPending(): boolean;
    get data(): Data;
    get message(): string;
    setState(state: State): void;
    setData(data: Data | undefined): void;
    setMessage(message: string | undefined): void;
    reset(): void;
    get walletStatus(): WalletStatus;
    get isWalletOnceConnect(): boolean;
    get isWalletConnecting(): boolean;
    get isWalletConnected(): boolean;
    get isWalletDisconnected(): boolean;
    get isWalletRejected(): boolean;
    get isWalletNotExist(): boolean;
    get isWalletError(): boolean;
}
