"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_registry_1 = require("chain-registry");
const config_1 = require("../config");
const name_service_1 = require("../name-service");
// Set longer test timeout to allow for network requests
jest.setTimeout(15000);
describe('Parse INS names', () => {
    it('Parses a full INS name', () => {
        expect((0, name_service_1.parseINSName)('bar@stars.sns')).toEqual({
            name: 'bar',
            resolver: 'stars',
            nameservice: 'sns',
        });
    });
    it('Returns undefined for incorrectly formatted INS names', () => {
        expect((0, name_service_1.parseINSName)('bar.stars')).toEqual(undefined);
        expect((0, name_service_1.parseINSName)('bar@stars')).toEqual(undefined);
    });
});
describe('INS name resolver', () => {
    it('Instantiates correctly', () => {
        const ins = new name_service_1.INS(chain_registry_1.chains, config_1.nameServiceRegistries);
        expect(ins.chains).toEqual(chain_registry_1.chains);
        expect(ins.ins_registry).toEqual(config_1.nameServiceRegistries);
    });
    it('Resolves an address for an INS name on ICNS', async () => {
        const ins = new name_service_1.INS(chain_registry_1.chains, config_1.nameServiceRegistries);
        const address = await ins.resolveINSAddress('rj@osmo.icns');
        expect(address).toBeTruthy();
        expect(address).not.toEqual('');
    });
    it('Resolves an address for an INS name on Stargaze Name Service', async () => {
        const ins = new name_service_1.INS(chain_registry_1.chains, config_1.nameServiceRegistries);
        const address = await ins.resolveINSAddress('daoist@stars.sns');
        expect(address).toBeTruthy();
        expect(address).not.toEqual('');
    });
    it('Resolves a name for an address using the Stargaze name service', async () => {
        const ins = new name_service_1.INS(chain_registry_1.chains, config_1.nameServiceRegistries);
        const name = await ins.resolveInsName('stars139a4n6w6dhwv60dj2clgwm6r0q84gju28z9at0', 'sns');
        expect(name).toEqual('daoist');
    });
    it('Resolves a name for an address using ICNS', async () => {
        const ins = new name_service_1.INS(chain_registry_1.chains, config_1.nameServiceRegistries);
        const name = await ins.resolveInsName('osmo15hndzyqykg09fturlkgayw0849xu686mmjrqns', 'icns');
        expect(name).toEqual('rj.osmo');
    });
    it('Throws errors resolving address if nameservice not found', async () => {
        const ins = new name_service_1.INS(chain_registry_1.chains, config_1.nameServiceRegistries);
        await expect(ins.resolveInsName('osmo15hndzyqykg09fturlkgayw0849xu686mmjrqns', 'notarealnameservice')).rejects.toThrow('Nameservice not found');
    });
    it('Throws errors resolving name if nameservice not found', async () => {
        const ins = new name_service_1.INS(chain_registry_1.chains, config_1.nameServiceRegistries);
        await expect(ins.resolveINSAddress('baz@stars.notarealnameservice')).rejects.toThrow('Nameservice not found');
    });
});
