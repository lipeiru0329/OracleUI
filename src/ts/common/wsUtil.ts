import WebSocket from 'isomorphic-ws';
// import orderUtil from '../../../../israfel-relayer/src/utils/orderUtil';
// import * as CST from './constants';
import { IWsAddBidRequest, IWsResponse, IWsTemp } from './types';
import Web3Util from './web3Util';

const web3Util = new Web3Util(window, !__KOVAN__, '', false);

class WsUtil {
	public ws: WebSocket | null = null;
	private handleConnected: () => any = () => ({});
	// private handleReconnect: () => any = () => ({});
	// private handleInfoUpdate: (
	// 	tokens: IToken[],
	// 	status: IStatus[],
	// 	acceptedPrices: { [custodian: string]: IAcceptedPrice[] }
	// ) => any = () => ({});
	// private handleOrderUpdate: (userOrder: IUserOrder) => any = () => ({});
	// private handleOrderHistoryUpdate: (userOrders: IUserOrder[]) => any = () => ({});
	// private handleOrderError: (
	// 	method: string,
	// 	orderHash: string,
	// 	error: string
	// ) => any = () => ({});
	// // private handleOrderBookSnapshot: (orderBookSnapshot: IOrderBookSnapshot) => any = () => ({});
	// // private handleOrderBookUpdate: (orderBookUpdate: IOrderBookSnapshotUpdate) => any = () => ({});
	private handleResponse: (res: IWsResponse) => any = () => ({});
	public reconnectionNumber: number = 0;
	public latestVersionNumber: number = 0;

	public sleep(ms: number) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}

	private reconnect() {
		this.ws = null;
		if (this.reconnectionNumber < 100) {
			this.sleep(5000);
			setTimeout(() => {
				this.connectToRelayer();
				this.reconnectionNumber++;
			}, 5000);
		} else alert("Please refresh brower");
	}

	public async connectToRelayer() {
		const account = await web3Util.getCurrentAddress();
		this.ws = new WebSocket(`ws://localhost:3000`);
		this.ws.onopen = () => {
			console.log('reconnect');
			const msg: any = {
				op: "setAccount",
				data: {
					accountId: account
				}
			};
			console.log(msg);
			this.ws.send(JSON.stringify(msg));
			this.reconnectionNumber = 0;
			this.handleConnected();
		};
		this.ws.onmessage = (m: any) => this.handleMessage(m.data.toString());
		this.ws.onerror = () => this.reconnect();
		this.ws.onclose = () => this.reconnect();
	}

	// public handleOrderResponse(response: IWsResponse) {
	// 	if (response.status !== CST.WS_OK)
	// 		this.handleOrderError(
	// 			response.method,
	// 			(response as IWsOrderResponse).orderHash,
	// 			response.status
	// 		);
	// 	else if (response.method === CST.WS_HISTORY)
	// 		this.handleOrderHistoryUpdate((response as IWsOrderHistoryResponse).orderHistory);
	// 	else this.handleOrderUpdate((response as IWsUserOrderResponse).userOrder);
	// }

	// public handleOrderBookResponse(orderBookResponse: IWsResponse) {
	// 	if (orderBookResponse.status !== CST.WS_OK)
	// 		this.handleOrderBookError(
	// 			orderBookResponse.method,
	// 			orderBookResponse.pair,
	// 			orderBookResponse.status
	// 		);
	// 	else if (orderBookResponse.method === CST.DB_SNAPSHOT) {
	// 		if (
	// 			(orderBookResponse as IWsOrderBookResponse).orderBookSnapshot.version <
	// 			this.latestVersionNumber
	// 		) {
	// 			wsUtil.subscribeOrderBook(
	// 				(orderBookResponse as IWsOrderBookResponse).orderBookSnapshot.pair
	// 			);
	// 			this.latestVersionNumber = (orderBookResponse as IWsOrderBookResponse).orderBookSnapshot.version;
	// 		}
	// 		this.handleOrderBookSnapshot(
	// 			(orderBookResponse as IWsOrderBookResponse).orderBookSnapshot
	// 		);
	// 	} else {
	// 		console.log(orderBookResponse as IWsOrderBookResponse);
	// 		this.latestVersionNumber = (orderBookResponse as IWsOrderBookResponse).orderBookSnapshot
	// 			? (orderBookResponse as IWsOrderBookResponse).orderBookSnapshot.version
	// 			: 0;
	// 		this.handleOrderBookUpdate(
	// 			(orderBookResponse as IWsOrderBookUpdateResponse).orderBookUpdate
	// 		);
	// 	}
	// }

	public handleMessage(message: string) {
		console.log(message);
		const res: IWsTemp = JSON.parse(message);
		console.log('res');
		console.log(res);
		// if (res.method !== CST.WS_UNSUB)
		switch (res.op) {
			case "update":
				this.handleResponse((res as any).relayersInfo);
		}
		// 			break;
		// 		case CST.DB_ORDER_BOOKS:
		// 			this.handleOrderBookResponse(res);
		// 			break;
		// 		case CST.WS_INFO:
		// 			const { tokens, processStatus, acceptedPrices } = res as IWsInfoResponse;
		// 			web3Util.setTokens(tokens);
		// 			this.handleInfoUpdate(tokens, processStatus, acceptedPrices);
		// 			break;
		// 		default:
		// 			break;
		// 	}
	}



	// public subscribeOrderBook(pair: string) {
	// 	if (!this.ws) return;

	// 	const msg: IWsRequest = {
	// 		method: CST.WS_SUB,
	// 		channel: CST.DB_ORDER_BOOKS,
	// 		pair: pair
	// 	};
	// 	this.ws.send(JSON.stringify(msg));
	// }

	// public unsubscribeOrderBook(pair: string) {
	// 	if (!this.ws) return;

	// 	const msg: IWsRequest = {
	// 		method: CST.WS_UNSUB,
	// 		channel: CST.DB_ORDER_BOOKS,
	// 		pair: pair
	// 	};
	// 	this.ws.send(JSON.stringify(msg));
	// }

	// public subscribeOrderHistory(account: string, pair: string) {
	// 	if (!this.ws) return;

	// 	if (!web3Util.isValidAddress(account)) return;

	// 	const msg: IWsOrderHistoryRequest = {
	// 		method: CST.WS_SUB,
	// 		channel: CST.DB_ORDERS,
	// 		pair: pair,
	// 		account: account
	// 	};
	// 	this.ws.send(JSON.stringify(msg));
	// }

	// public unsubscribeOrderHistory(account: string, pair: string) {
	// 	if (!this.ws) return;

	// 	const msg: IWsOrderHistoryRequest = {
	// 		method: CST.WS_UNSUB,
	// 		channel: CST.DB_ORDERS,
	// 		pair: pair,
	// 		account: account
	// 	};
	// 	this.ws.send(JSON.stringify(msg));
	// }

	public async addStack(
		time: number,
		name: string,
		amt: number,
		hash: string
	) {
		if (!this.ws) return;
		const msg: IWsAddBidRequest = {
			time: time,
			name: name,
			amt: amt,
			hash: hash
		};
		this.ws.send(JSON.stringify(msg));
	}

	// public deleteOrder(pair: string, orderHash: string, signature: string) {
	// 	if (!this.ws) return;

	// 	const msg: IWsTerminateOrderRequest = {
	// 		method: CST.DB_TERMINATE,
	// 		channel: CST.DB_ORDERS,
	// 		pair: pair,
	// 		orderHash: orderHash,
	// 		signature: signature
	// 	};
	// 	console.log(msg);
	// 	this.ws.send(JSON.stringify(msg));
	// }

	// public onOrder(
	// 	handleHistory: (userOrders: IUserOrder[]) => any,
	// 	handleUpdate: (userOrder: IUserOrder) => any,
	// 	handleError: (method: string, orderHash: string, error: string) => any
	// ) {
	// 	this.handleOrderHistoryUpdate = handleHistory;
	// 	this.handleOrderUpdate = handleUpdate;
	// 	this.handleOrderError = handleError;
	// }

	// public onOrderBook(
	// 	handleSnapshot: (orderBookSnapshot: IOrderBookSnapshot) => any,
	// 	handleUpdate: (orderBookUpdate: IOrderBookSnapshotUpdate) => any,
	// 	handleError: (method: string, pair: string, error: string) => any
	// ) {
	// 	this.handleOrderBookSnapshot = handleSnapshot;
	// 	this.handleOrderBookUpdate = handleUpdate;
	// 	this.handleOrderBookError = handleError;
	// }

	public onConnection(handleResponse: (res: IWsResponse) => any) {
		this.handleResponse = handleResponse;
		// this.handleReconnect = handleReconnect;
	}

	// public onInfoUpdate(
	// 	handleInfoUpdate: (
	// 		tokens: IToken[],
	// 		status: IStatus[],
	// 		acceptedPrices: { [custodian: string]: IAcceptedPrice[] }
	// 	) => any
	// ) {
	// 	this.handleInfoUpdate = handleInfoUpdate;
	// }
}

const wsUtil = new WsUtil();
export default wsUtil;
