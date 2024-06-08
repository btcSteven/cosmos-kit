"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainIdToBech32Prefix = exports.getCosmosPath = exports.getCosmosApp = void 0;
const chain_registry_1 = require("chain-registry");
const hw_app_cosmos_1 = __importDefault(require("@ledgerhq/hw-app-cosmos"));
const hw_transport_webusb_1 = __importDefault(require("@ledgerhq/hw-transport-webusb"));
const hw_transport_webhid_1 = __importDefault(require("@ledgerhq/hw-transport-webhid"));
async function getCosmosApp(type = 'WebUSB') {
    if (type === 'WebUSB') {
        return new hw_app_cosmos_1.default(await hw_transport_webusb_1.default.create());
    }
    if (type === 'WebHID') {
        return new hw_app_cosmos_1.default(await hw_transport_webhid_1.default.create());
    }
    throw new Error(`Unknown transport type: ${type}`);
}
exports.getCosmosApp = getCosmosApp;
function getCosmosPath(accountIndex = 0) {
    return `44'/118'/${accountIndex}'/0/0`;
}
exports.getCosmosPath = getCosmosPath;
exports.ChainIdToBech32Prefix = {};
for (const chain of chain_registry_1.chains) {
    exports.ChainIdToBech32Prefix[chain.chain_id] = chain.bech32_prefix;
}
