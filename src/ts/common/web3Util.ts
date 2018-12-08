// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';

import {
	ContractAddresses,
	ContractWrappers,
	OrderTransactionOpts,
	RPCSubprovider,
	SignedOrder,
	Web3ProviderEngine
} from '0x.js';
import { getContractAddressesForNetworkOrThrow } from '@0x/contract-addresses';
import { MetamaskSubprovider } from '@0x/subproviders';
import { addressUtils } from '@0x/utils';
import { Web3Wrapper } from '@0x/web3-wrapper';
import * as CST from './constants';
// import { IRawOrder, IStringSignedOrder, IToken } from '../common/types';

const Web3Personal = require('web3-eth-personal');
const Web3Utils = require('web3-utils');

export enum Wallet {
	None,
	Local,
	MetaMask,
	Ledger
}

export default class Web3Util {
	private contractWrappers: ContractWrappers;
	private web3Wrapper: Web3Wrapper;
	public wallet: Wallet = Wallet.None;
	public accountIndex: number = 0;
	public networkId: number = CST.NETWORK_ID_KOVAN;
	private rawMetamaskProvider: any = null;
	private web3Eth: any = null;
	// private web3Accounts: any = null;
	private web3Personal: any = null;
	public contractAddresses: ContractAddresses;
	public readonly relayerAddress: string;

	constructor(window: any, live: boolean, privateKey: string, local: boolean) {
		this.networkId = live ? CST.NETWORK_ID_MAIN : CST.NETWORK_ID_KOVAN;
		if (window && (window.ethereum || window.web3)) {
			this.rawMetamaskProvider = window.ethereum || window.web3.currentProvider;
			this.web3Wrapper = new Web3Wrapper(new MetamaskSubprovider(this.rawMetamaskProvider));
			this.web3Personal = new Web3Personal(this.rawMetamaskProvider);
			this.wallet = Wallet.MetaMask;
		} else {
			const pe = new Web3ProviderEngine();
			pe.addProvider(new RPCSubprovider(CST.PROVIDER_LOCAL));
			pe.start();
			this.web3Wrapper = new Web3Wrapper(pe);
			// this.web3Accounts = new Web3Accounts(this.web3Wrapper.getProvider());
			this.wallet = local || (!window && privateKey) ? Wallet.Local : Wallet.None;
		}

		this.contractWrappers = new ContractWrappers(this.web3Wrapper.getProvider(), {
			networkId: this.networkId
		});

		this.contractAddresses = getContractAddressesForNetworkOrThrow(this.networkId);
		this.relayerAddress = live ? CST.RELAYER_ADDR_MAIN : CST.RELAYER_ADDR_KOVAN;
	}

	public getProvider() {
		return this.web3Wrapper.getProvider();
	}

	public getTransactionCount() {
		return this.web3Eth.getTransactionCount(this.relayerAddress);
	}

	public getGasPrice() {
		return this.web3Eth.getGasPrice();
	}

	public matchOrders(
		leftOrder: SignedOrder,
		rightOrder: SignedOrder,
		txOption?: OrderTransactionOpts
	) {
		return this.contractWrappers.exchange.matchOrdersAsync(
			leftOrder,
			rightOrder,
			this.relayerAddress,
			txOption || {}
		);
	}

	public web3PersonalSign(account: string, message: string): Promise<string> {
		if (this.wallet !== Wallet.MetaMask) return Promise.reject();
		return this.web3Personal.sign(message, account);
	}

	public onWeb3AccountUpdate(onUpdate: (addr: string, network: number) => any) {
		if (this.wallet !== Wallet.MetaMask) return;

		const store = this.rawMetamaskProvider.publicConfigStore;
		if (store)
			store.on('update', () => {
				if (
					this.wallet === Wallet.MetaMask &&
					store.getState().selectedAddress &&
					store.getState().networkVersion
				)
					onUpdate(
						store.getState().selectedAddress,
						Number(store.getState().networkVersion)
					);
			});
	}

	public async getCurrentAddress(): Promise<string> {
		const accounts = await this.web3Wrapper.getAvailableAddressesAsync();
		return accounts[this.accountIndex] || CST.DUMMY_ADDR;
	}

	public getCurrentNetwork(): Promise<number> {
		return this.web3Wrapper.getNetworkIdAsync();
	}

	public isValidAddress(address: string) {
		return address !== CST.DUMMY_ADDR && addressUtils.isAddress(address);
	}

	public getTransactionReceipt(txHash: string) {
		return this.web3Wrapper.getTransactionReceiptIfExistsAsync(txHash);
	}

	public static toChecksumAddress(address: string): string {
		return Web3Utils.toChecksumAddress(address);
	}
}

export const web3Util = new Web3Util(window, !__KOVAN__, '', false);
