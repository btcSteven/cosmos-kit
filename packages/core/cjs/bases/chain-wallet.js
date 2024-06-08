"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainWalletBase = void 0;
const constants_1 = require("../cosmiframe/constants");
const types_1 = require("../types");
const utils_1 = require("../utils");
const wallet_1 = require("./wallet");
class ChainWalletBase extends wallet_1.WalletBase {
    mainWallet;
    chainRecord;
    _rpcEndpoint;
    _restEndpoint;
    connectChains;
    offlineSigner;
    namespace = 'cosmos';
    preferredSignType;
    constructor(walletInfo, chainRecord) {
        super(walletInfo);
        this.chainRecord = chainRecord;
        this.preferredSignType =
            chainRecord.clientOptions?.preferredSignType || 'amino';
    }
    get chain() {
        return this.chainRecord.chain;
    }
    get assetList() {
        return this.chainRecord.assetList;
    }
    get isTestNet() {
        return this.chainName.includes('testnet');
    }
    get preferredEndpoints() {
        return this.chainRecord.preferredEndpoints;
    }
    get rpcEndpoints() {
        return this.preferredEndpoints?.rpc || [];
    }
    get restEndpoints() {
        return this.preferredEndpoints?.rest || [];
    }
    /**
     * stands for real `chainIsLazy` considered both `globalIsLazy` and `chainIsLazy` settings
     */
    get isLazy() {
        return this.preferredEndpoints.isLazy;
    }
    addEndpoints(endpoints) {
        this.chainRecord.preferredEndpoints = {
            isLazy: endpoints?.isLazy ?? this.preferredEndpoints?.isLazy,
            rpc: [...(endpoints?.rpc || []), ...(this.preferredEndpoints?.rpc || [])],
            rest: [
                ...(endpoints?.rest || []),
                ...(this.preferredEndpoints?.rest || []),
            ],
        };
    }
    get chainName() {
        return this.chainRecord.name;
    }
    get chainLogoUrl() {
        return (
        // until chain_registry fix this
        // this.chainInfo.chain.logo_URIs?.svg ||
        // this.chainInfo.chain.logo_URIs?.png ||
        // this.chainInfo.chain.logo_URIs?.jpeg ||
        this.assetList?.assets[0]?.logo_URIs?.svg ||
            this.assetList?.assets[0]?.logo_URIs?.png ||
            undefined);
    }
    get stargateOptions() {
        return this.chainRecord.clientOptions?.stargate;
    }
    get signingStargateOptions() {
        return (this.chainRecord.clientOptions?.signingStargate ||
            this.chainRecord.clientOptions?.stargate);
    }
    get signingCosmwasmOptions() {
        return this.chainRecord.clientOptions?.signingCosmwasm;
    }
    get assets() {
        return this.assetList?.assets;
    }
    get chainId() {
        return this.chain?.chain_id;
    }
    get cosmwasmEnabled() {
        return this.chain?.codebase?.cosmwasm_enabled;
    }
    get username() {
        return this.data?.username;
    }
    get address() {
        return this.data?.address;
    }
    setData(data) {
        this.logger?.debug(`[Data Change] ${JSON.stringify(this.data)} -> ${JSON.stringify(data)} (${this.chainName}/${this.walletName})`);
        this._mutable.data = data;
        this.actions?.data?.(data);
        const accountsStr = window.localStorage.getItem('cosmos-kit@2:core//accounts');
        let accounts = accountsStr ? JSON.parse(accountsStr) : [];
        if (typeof data === 'undefined') {
            accounts = accounts.filter((a) => a.chainId !== this.chainId || a.namespace !== this.namespace);
        }
        else {
            accounts = accounts.filter((a) => a.chainId !== this.chainId || a.namespace !== this.namespace);
            accounts.push(data);
        }
        window?.localStorage.setItem('cosmos-kit@2:core//accounts', JSON.stringify(accounts));
        this.session?.update();
    }
    initClient(_options) {
        throw new Error('initClient not implemented');
    }
    async update(options = { connect: true }) {
        this.setState(types_1.State.Pending);
        this.setMessage(void 0);
        try {
            if (options.connect) {
                this.connectChains
                    ? await this.connectChains()
                    : await this?.client?.connect?.(this.chainId);
            }
            let account;
            try {
                this.logger?.debug(`Fetching ${this.walletName} ${this.chainId} account.`);
                account = await this?.client?.getSimpleAccount(this.chainId);
            }
            catch (error) {
                if (this.rejectMatched(error)) {
                    this.logger?.debug(`Fetching rejected.`);
                    this.setRejected(new utils_1.ConnectError());
                    return;
                }
                if (this.client && this?.client?.addChain) {
                    this.logger?.debug(`Going to add chain ${this.chainId}`);
                    await this.client.addChain(this.chainRecord);
                    account = await this.client.getSimpleAccount(this.chainId);
                }
                else {
                    throw error;
                }
            }
            this.setData(account);
            this.setState(types_1.State.Done);
            this.setMessage(void 0);
        }
        catch (e) {
            // this.logger?.error(e);
            if (e && this.rejectMatched(e)) {
                this.setRejected(new utils_1.ConnectError());
            }
            else {
                this.setError(new utils_1.ConnectError(e.message));
            }
        }
        if (!this.isWalletRejected && this.walletName !== constants_1.COSMIFRAME_WALLET_ID) {
            window?.localStorage.setItem('cosmos-kit@2:core//current-wallet', this.walletName);
        }
    }
    getRpcEndpoint = async (isLazy) => {
        const { getIsLazy } = await Promise.resolve().then(() => __importStar(require('../utils')));
        const lazy = getIsLazy(void 0, this.isLazy, this._rpcEndpoint?.isLazy, isLazy, this.logger);
        if (lazy) {
            const endpoint = this._rpcEndpoint || this.rpcEndpoints[0];
            if (!endpoint) {
                return Promise.reject('No endpoint available.');
            }
            return endpoint;
        }
        const nodeType = 'rpc';
        const { isValidEndpoint } = await Promise.resolve().then(() => __importStar(require('../utils')));
        if (this._rpcEndpoint &&
            (await isValidEndpoint(this._rpcEndpoint, nodeType, lazy, this.logger))) {
            return this._rpcEndpoint;
        }
        const { getFastestEndpoint } = await Promise.resolve().then(() => __importStar(require('../utils')));
        this._rpcEndpoint = await getFastestEndpoint(this.rpcEndpoints, nodeType, this.logger);
        return this._rpcEndpoint;
    };
    getRestEndpoint = async (isLazy) => {
        const { getIsLazy } = await Promise.resolve().then(() => __importStar(require('../utils')));
        const lazy = getIsLazy(void 0, this.isLazy, this._restEndpoint?.isLazy, isLazy, this.logger);
        if (lazy) {
            const endpoint = this._restEndpoint || this.restEndpoints[0];
            if (!endpoint) {
                return Promise.reject('No endpoint available.');
            }
            return endpoint;
        }
        const nodeType = 'rest';
        const { isValidEndpoint } = await Promise.resolve().then(() => __importStar(require('../utils')));
        if (this._restEndpoint &&
            (await isValidEndpoint(this._restEndpoint, nodeType, lazy, this.logger))) {
            return this._restEndpoint;
        }
        const { getFastestEndpoint } = await Promise.resolve().then(() => __importStar(require('../utils')));
        this._restEndpoint = await getFastestEndpoint(this.restEndpoints, nodeType, this.logger);
        return this._restEndpoint;
    };
    getStargateClient = async () => {
        const rpcEndpoint = await this.getRpcEndpoint();
        const { StargateClient } = await Promise.resolve().then(() => __importStar(require('@cosmjs/stargate')));
        return StargateClient.connect(rpcEndpoint, this.stargateOptions);
    };
    getCosmWasmClient = async () => {
        const rpcEndpoint = await this.getRpcEndpoint();
        const { CosmWasmClient } = await Promise.resolve().then(() => __importStar(require('@cosmjs/cosmwasm-stargate')));
        return CosmWasmClient.connect(rpcEndpoint);
    };
    getNameService = async () => {
        const client = await this.getCosmWasmClient();
        const { getNameServiceRegistryFromChainName } = await Promise.resolve().then(() => __importStar(require('../utils')));
        const registry = getNameServiceRegistryFromChainName(this.chainName);
        const { NameService } = await Promise.resolve().then(() => __importStar(require('../name-service')));
        return new NameService(client, registry);
    };
    async initOfflineSigner(preferredSignType) {
        if (typeof this.client === 'undefined') {
            throw new Error('WalletClient is not initialized');
        }
        if (preferredSignType)
            this.preferredSignType = preferredSignType;
        this.offlineSigner = await this.client.getOfflineSigner(this.chainId, this.preferredSignType);
    }
    getSigningStargateClient = async () => {
        const rpcEndpoint = await this.getRpcEndpoint();
        if (!this.offlineSigner) {
            await this.initOfflineSigner();
        }
        const { SigningStargateClient } = await Promise.resolve().then(() => __importStar(require('@cosmjs/stargate')));
        return SigningStargateClient.connectWithSigner(rpcEndpoint, this.offlineSigner, this.signingStargateOptions);
    };
    getSigningCosmWasmClient = async () => {
        const rpcEndpoint = await this.getRpcEndpoint();
        if (!this.offlineSigner) {
            await this.initOfflineSigner();
        }
        const { SigningCosmWasmClient } = await Promise.resolve().then(() => __importStar(require('@cosmjs/cosmwasm-stargate')));
        return SigningCosmWasmClient.connectWithSigner(rpcEndpoint, this.offlineSigner, this.signingCosmwasmOptions);
    };
    getSigningClient = async (type) => {
        switch (type) {
            case 'stargate':
                return await this.getSigningStargateClient();
            case 'cosmwasm':
                return await this.getSigningCosmWasmClient();
            default:
                return this.getSigningStargateClient();
        }
    };
    estimateFee = async (messages, type, memo, multiplier) => {
        if (!this.address) {
            throw new Error('Address is required to estimate fee. Try connect to fetch address.');
        }
        let gasPrice;
        switch (type) {
            case 'stargate':
                gasPrice = this.signingStargateOptions?.gasPrice;
                break;
            case 'cosmwasm':
                gasPrice = this.signingCosmwasmOptions?.gasPrice;
                break;
            default:
                gasPrice = this.signingStargateOptions?.gasPrice;
                break;
        }
        if (!gasPrice) {
            throw new Error('Gas price must be set in the client options when auto gas is used.');
        }
        const client = await this.getSigningClient(type);
        const gasEstimation = await client.simulate(this.address, messages, memo);
        const { calculateFee } = await Promise.resolve().then(() => __importStar(require('@cosmjs/stargate')));
        return calculateFee(Math.round(gasEstimation * (multiplier || 1.4)), gasPrice);
    };
    sign = async (messages, fee, memo, type) => {
        if (!this.address) {
            throw new Error('Address is required to estimate fee. Try connect to fetch address.');
        }
        const client = await this.getSigningClient(type);
        let usedFee;
        if (typeof fee === 'undefined' || typeof fee === 'number') {
            usedFee = await this.estimateFee(messages, type, memo, fee);
        }
        else {
            usedFee = fee;
        }
        return await client.sign(this.address, messages, usedFee, memo || '');
    };
    broadcast = async (signedMessages, type) => {
        const client = await this.getSigningClient(type);
        const { TxRaw } = await Promise.resolve().then(() => __importStar(require('cosmjs-types/cosmos/tx/v1beta1/tx')));
        const txBytes = TxRaw.encode(signedMessages).finish();
        let timeoutMs, pollIntervalMs;
        switch (type) {
            case 'stargate':
                timeoutMs = this.signingStargateOptions?.broadcastTimeoutMs;
                pollIntervalMs = this.signingStargateOptions?.broadcastPollIntervalMs;
                break;
            case 'cosmwasm':
                timeoutMs = this.signingCosmwasmOptions?.broadcastTimeoutMs;
                pollIntervalMs = this.signingCosmwasmOptions?.broadcastPollIntervalMs;
                break;
            default:
                timeoutMs = this.signingStargateOptions?.broadcastTimeoutMs;
                pollIntervalMs = this.signingStargateOptions?.broadcastPollIntervalMs;
                break;
        }
        return client.broadcastTx(txBytes, timeoutMs, pollIntervalMs);
    };
    signAndBroadcast = async (messages, fee, memo, type) => {
        const signedMessages = await this.sign(messages, fee, memo, type);
        return this.broadcast(signedMessages, type);
    };
}
exports.ChainWalletBase = ChainWalletBase;
