import * as CST from 'ts/common/constants';
import { IWsResponse } from 'ts/common/types';

export function connectionUpdate(connected: boolean) {
	return {
		type: CST.AC_CONNECTION,
		value: connected
	};
}


export function updateResponse(res: IWsResponse) {
	return {
		type: CST.AC_RESPONSE,
		value: res
	};
}
