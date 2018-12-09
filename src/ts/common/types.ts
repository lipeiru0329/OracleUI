import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type VoidThunkAction = ThunkAction<void, IState, undefined, AnyAction>;

export interface IState {
	readonly firebase: IFirebaseState;
	readonly web3: IWeb3State;
	readonly ws: IWsState;
}

export interface IFirebaseState {
	readonly auth: boolean;
}

export interface IWeb3State {
	readonly account: string;
	readonly network: number;
}

export interface IWsAddBidRequest {
	readonly op: string;
	readonly data: {
		readonly timestamp: number;
		readonly relayerID: string;
		readonly stakeAmt: number;
		readonly sign: string;
		readonly accountAddress: string;
	};
}

export interface IWsResponse {
	readonly accountId: string;
	readonly price: number;
	readonly relayerID: string;
	readonly stakedAmt: number;
	readonly ts: number;
}

export interface IWsState {
	readonly connection: boolean;
	readonly res: IWsResponse[];
}

export interface IWsTemp{
	readonly op: string;
}
