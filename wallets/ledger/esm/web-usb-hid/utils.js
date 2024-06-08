import { chains } from 'chain-registry';
import Cosmos from "@ledgerhq/hw-app-cosmos";
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
export async function getCosmosApp(type = 'WebUSB') {
    if (type === 'WebUSB') {
        return new Cosmos(await TransportWebUSB.create());
    }
    if (type === 'WebHID') {
        return new Cosmos(await TransportWebHID.create());
    }
    throw new Error(`Unknown transport type: ${type}`);
}
export function getCosmosPath(accountIndex = 0) {
    return `44'/118'/${accountIndex}'/0/0`;
}
export const ChainIdToBech32Prefix = {};
for (const chain of chains) {
    ChainIdToBech32Prefix[chain.chain_id] = chain.bech32_prefix;
}
