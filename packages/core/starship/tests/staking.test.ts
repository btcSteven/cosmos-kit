// @ts-nocheck
import './setup.test';

import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { assertIsDeliverTxSuccess } from '@cosmjs/stargate';
import BigNumber from 'bignumber.js';
import { useChain } from 'starshipjs';
import { chains, assets } from 'chain-registry';
import { cosmos, getSigningCosmosClient } from 'osmojs';
import { generateMnemonic } from '../src';
import { WalletManager } from '../../src';
import { wallets } from '@cosmos-kit/cosmjs';

describe('Staking tokens testing', () => {
  let wallet, denom, address;
  let chainInfo, getCoin, getRpcEndpoint, creditFromFaucet;

  // Variables used accross testcases
  let queryClient;
  let validatorAddress;
  let delegationAmount;

  beforeAll(async () => {
    const { chain, chainInfo, getCoin, getRpcEndpoint, creditFromFaucet } =
      useChain('cosmos');

    const walletManager = new WalletManager([chain], wallets);
    denom = getCoin().base;
    const client = await walletManager.connect('cosmjs');

    // Initialize wallet
    wallet = walletManager
      .getMainWallet('mork-wallet')
      // wallet = await DirectSecp256k1HdWallet.fromMnemonic(generateMnemonic(), {
      //   prefix: chainInfo.chain.bech32_prefix,
      // });

      .console.log('walletManager', walletManager, wallet);
    address = client.address;

    // Create custom cosmos interchain client
    queryClient = await cosmos.ClientFactory.createRPCQueryClient({
      rpcEndpoint: getRpcEndpoint(),
    });

    // Transfer osmosis and ibc tokens to address, send only osmo to address
    await creditFromFaucet(address);
  }, 200000);

  it('check address has tokens', async () => {
    const { balance } = await queryClient.cosmos.bank.v1beta1.balance({
      address,
      denom,
    });

    expect(balance.amount).toEqual('10000000000');
  }, 10000);

  it('query validator address', async () => {
    const { validators } = await queryClient.cosmos.staking.v1beta1.validators({
      status: cosmos.staking.v1beta1.bondStatusToJSON(
        cosmos.staking.v1beta1.BondStatus.BOND_STATUS_BONDED
      ),
    });
    let allValidators = validators;
    if (validators.length > 1) {
      allValidators = validators.sort((a, b) =>
        new BigNumber(b.tokens).minus(new BigNumber(a.tokens)).toNumber()
      );
    }

    expect(allValidators.length).toBeGreaterThan(0);

    // set validator address to the first one
    validatorAddress = allValidators[0].operatorAddress;
  });

  it('stake tokens to genesis validator', async () => {
    const signingClient = await getSigningCosmosClient({
      rpcEndpoint: getRpcEndpoint(),
      signer: wallet,
    });

    const { balance } = await queryClient.cosmos.bank.v1beta1.balance({
      address,
      denom,
    });

    // Stake half of the tokens
    // eslint-disable-next-line no-undef
    delegationAmount = (BigInt(balance.amount) / BigInt(2)).toString();
    const msg = cosmos.staking.v1beta1.MessageComposer.fromPartial.delegate({
      delegatorAddress: address,
      validatorAddress: validatorAddress,
      amount: {
        amount: delegationAmount,
        denom: balance.denom,
      },
    });

    const fee = {
      amount: [
        {
          denom,
          amount: '100000',
        },
      ],
      gas: '550000',
    };

    const result = await signingClient.signAndBroadcast(address, [msg], fee);
    assertIsDeliverTxSuccess(result);
  });

  it('query delegation', async () => {
    const { delegationResponse } =
      await queryClient.cosmos.staking.v1beta1.delegation({
        delegatorAddr: address,
        validatorAddr: validatorAddress,
      });

    // Assert that the delegation amount is the set delegation amount
    // eslint-disable-next-line no-undef
    expect(BigInt(delegationResponse.balance.amount)).toBeGreaterThan(
      // eslint-disable-next-line no-undef
      BigInt(0)
    );
    expect(delegationResponse.balance.amount).toEqual(delegationAmount);
    expect(delegationResponse.balance.denom).toEqual(denom);
  });
});