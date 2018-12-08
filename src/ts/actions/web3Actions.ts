import * as CST from 'ts/common/constants';
import { VoidThunkAction } from 'ts/common/types';
import Web3Util from 'ts/common/web3Util';

const web3Util = new Web3Util(window, !__KOVAN__, '', false);

export function accountUpdate(account: string) {
	return {
		type: CST.AC_ACCOUNT,
		value: account
	};
}

export function getAccount(): VoidThunkAction {
	return async dispatch => {
		const account = await web3Util.getCurrentAddress();
		if (account) dispatch(accountUpdate(account));
	};
}

export function networkUpdate(networkId: number) {
	return {
		type: CST.AC_NETWORK,
		value: networkId
	};
}

export function getNetwork(): VoidThunkAction {
	return async dispatch => dispatch(networkUpdate(await web3Util.getCurrentNetwork()));
}
