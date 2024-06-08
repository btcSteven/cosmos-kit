"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@cosmos-kit/core");
const react_lite_1 = require("@cosmos-kit/react-lite");
const react_1 = require("react");
const modal_1 = require("./modal");
const views_1 = require("./modal/components/views");
const ChainProvider = ({ chains, assetLists, wallets, walletModal, modalViews, throwErrors = false, subscribeConnectEvents = true, defaultNameService = 'icns', walletConnectOptions, signerOptions, endpointOptions, sessionOptions, logLevel = 'WARN', allowedIframeParentOrigins = [
    'https://app.osmosis.zone',
    'https://daodao.zone',
    'https://dao.daodao.zone',
], children, modalTheme = {}, modalOptions, }) => {
    const logger = (0, react_1.useMemo)(() => new core_1.Logger(logLevel), []);
    const withChainProvider = (modal) => ((0, jsx_runtime_1.jsx)(react_lite_1.ChainProvider, { chains: chains, assetLists: assetLists, wallets: wallets, walletModal: modal, throwErrors: throwErrors, subscribeConnectEvents: subscribeConnectEvents, defaultNameService: defaultNameService, walletConnectOptions: walletConnectOptions, signerOptions: signerOptions, endpointOptions: endpointOptions, sessionOptions: sessionOptions, logLevel: logLevel, allowedIframeParentOrigins: allowedIframeParentOrigins, children: children }));
    if (walletModal) {
        logger.debug('Using provided wallet modal.');
        return withChainProvider(walletModal);
    }
    logger.debug('Using default wallet modal.');
    const defaultModal = (0, react_1.useCallback)((props) => ((0, jsx_runtime_1.jsx)(modal_1.WalletModal, { ...props, ...modalTheme, modalViews: {
            ...views_1.defaultModalViews,
            ...modalViews,
        }, modalOptions: modalOptions })), [views_1.defaultModalViews]);
    return withChainProvider(defaultModal);
};
exports.ChainProvider = ChainProvider;
