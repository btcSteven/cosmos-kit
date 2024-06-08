"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INS = exports.parseINSName = void 0;
const cosmwasm_stargate_1 = require("@cosmjs/cosmwasm-stargate");
/**
 * Parse a name into its components.
 *
 * The format is [name]@[chain_prefix].[resolver], similar to an email address.
 * For example, `meow@juno.sns` would resolve a Juno address using the Stargaze
 *
 * @param {String} name A fully compliant INS name.
 * @returns {ParsedInsName} The parsed name.
 **/
const parseINSName = (name) => {
    const insRegEx = /(?<name>[a-z0-9]+)@(?<resolver>[a-z]+)\.(?<nameservice>[a-z]{2,})/;
    return name.match(insRegEx)?.groups;
};
exports.parseINSName = parseINSName;
/**
 * This class is used to resolve names and addresses accross the Interchain Name System.
 *
 * @Module INS
 */
class INS {
    chains;
    ins_registry;
    /**
     * This class is used to resolve names and addresses.
     */
    constructor(chains, ins_registry) {
        this.chains = chains;
        this.ins_registry = ins_registry;
    }
    /**
     * Resolve a name to an address using a specific nameservice.
     *
     * @param {string} address The address to resolve a name for.
     */
    async resolveInsName(address, nameservice) {
        // Find item in list of objects with a certatin key value pair
        const registry = this.ins_registry.find((item) => item.name === nameservice);
        // Check if registry exists
        if (!registry)
            throw new Error('Nameservice not found');
        // Get the chain info for the registry
        const chain = this.chains.find((item) => item.chain_name === registry.chainName);
        // Load the client for the appropriate chain
        // TODO better logic for loading RPCs and handling errors
        // NOTE in production a wallet provider will likely want to use their own RPCs
        let client;
        for (let i = 0; i < chain.apis.rpc.length; i++) {
            try {
                client = await cosmwasm_stargate_1.CosmWasmClient.connect(chain.apis.rpc[i]?.address);
                break;
            }
            catch (e) {
                continue;
            }
        }
        const { contract, getNameQueryMsg, normalizeNameResponse } = registry;
        const result = await client.queryContractSmart(contract, getNameQueryMsg(address));
        return normalizeNameResponse(result);
    }
    /**
     * Resolve a full INS name to an address.
     *
     * The format is [name]@[chain_prefix].[resolver], similar to an email address.
     * For example, `jake@juno.sns` would resolve the address using the Stargaze
     *
     * @param {String} name A fully compliant INS name.
     **/
    async resolveINSAddress(insName) {
        // Parse ins name
        const { name, resolver, nameservice } = (0, exports.parseINSName)(insName);
        // Find item in list of objects with a certatin key value pair
        const registry = this.ins_registry.find((item) => item.name === nameservice);
        // Check if registry exists
        if (!registry)
            throw new Error('Nameservice not found');
        // Get the chain info for the registry
        const chain = this.chains.find((item) => item.chain_name === registry.chainName);
        // Load the client for the appropriate chain
        // TODO better logic for loading RPCs and handling errors
        // NOTE in production a wallet provider will likely want to use their own RPCs
        let client;
        for (let i = 0; i < chain.apis.rpc.length; i++) {
            try {
                client = await cosmwasm_stargate_1.CosmWasmClient.connect(chain.apis.rpc[i]?.address);
                break;
            }
            catch (e) {
                continue;
            }
        }
        // try {
        const { contract, getAddressQueryMsg, normalizeAddressResponse } = registry;
        const result = await client.queryContractSmart(contract, getAddressQueryMsg(name, resolver));
        return normalizeAddressResponse(result);
    }
}
exports.INS = INS;
