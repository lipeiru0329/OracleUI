import { Layout, Spin } from 'antd';
import * as React from 'react';
// import { SContent } from './_styled';
import { SDivFlexCenter } from './_styled';
import PriceColumn from './Cards/PriceColumn';
import Header from './Header';
import { IWsResponse } from 'ts/common/types';

export interface IProps {
	account: string;
	res: IWsResponse[];
	// signedIn: boolean;
}

export default class Admin extends React.PureComponent<IProps> {
	public render() {
		const { account, res } = this.props;
		console.log(res);
		console.log(Object.keys(this.props.res));
		if (Object.keys(this.props.res).length > 0)
			console.log(res[Object.keys(res)[0] as any].relayerID);
		console.log("resdfge");
		return (
			<Layout>
				<Header />
				{Object.keys(this.props.res).length > 0 ? [
					<div style={{ margin: "10px" }}>
						<SDivFlexCenter center horizontal marginBottom="10px;">
							<PriceColumn className={"left top"} name={res[Object.keys(res)[0] as any].relayerID} price={res[Object.keys(res)[0] as any].price} stack={2} yourStack={3} account={account} />
							<PriceColumn className={"middle top"} name={res[Object.keys(res)[1] as any].relayerID} price={res[Object.keys(res)[1] as any].price} stack={3} yourStack={2} account={account} />
							<PriceColumn className={"right top"} name={res[Object.keys(res)[2] as any].relayerID} price={res[Object.keys(res)[2] as any].price} stack={2} yourStack={3} account={account} />
						</SDivFlexCenter>,
					<SDivFlexCenter center horizontal marginBottom="10px;">
							<PriceColumn className={"left"} name={"replayer 1"} price={1} stack={2} yourStack={3} account={account} />
							<PriceColumn className={"middle"} name={"relayer 2"} price={2} stack={3} yourStack={2} account={account} />
							<PriceColumn className={"right"} name={"relayer 2"} price={2} stack={3} yourStack={2} account={account} />
						</SDivFlexCenter>,
					<SDivFlexCenter center horizontal marginBottom="10px;">
							<PriceColumn className={"left down"} name={"replayer 1"} price={1} stack={2} yourStack={3} account={account} />
							<PriceColumn className={"middle down"} name={"relayer 2"} price={2} stack={3} yourStack={2} account={account} />
							<PriceColumn className={"right down"} name={"relayer 2"} price={2} stack={3} yourStack={2} account={account} />
						</SDivFlexCenter>
					</div>
				] : (<Spin style={{
					position: "relative",
					top: "150px"
				}} tip="Loading....."></Spin>)}
			</Layout>
		);
	}
}
