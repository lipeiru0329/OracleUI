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
		if (res !== undefined) {
			console.log(Object.keys(this.props.res));
			if (Object.keys(this.props.res).length > 0)
				console.log(res[Object.keys(res)[0] as any].relayerID);
		}
		console.log('resdfge');
		return <Layout>
			<Header />
			{res !== undefined && Object.keys(this.props.res).length > 0 ? [<div style={{ margin: '10px' }}>
				<SDivFlexCenter center horizontal marginBottom="10px;">
					<PriceColumn className={'left top'} name={res[Object.keys(res)[0] as any].relayerID} price={Number(Number(res[Object.keys(res)[0] as any].price).toFixed(2))} stack={2} yourStack={res[Object.keys(res)[0] as any].stakedAmt} account={account} />
					<PriceColumn className={'middle top'} name={res[Object.keys(res)[1] as any].relayerID} price={Number(Number(res[Object.keys(res)[1] as any].price).toFixed(2))} stack={3} yourStack={res[Object.keys(res)[1] as any].stakedAmt} account={account} />
					<PriceColumn className={'right top'} name={res[Object.keys(res)[2] as any].relayerID} price={Number(Number(res[Object.keys(res)[2] as any].price).toFixed(2))} stack={2} yourStack={res[Object.keys(res)[2] as any].stakedAmt} account={account} />
				</SDivFlexCenter>,
				{this.props.res.length > 3 ?
					<SDivFlexCenter center horizontal marginBottom="10px;">
						<PriceColumn className={'left'} name={'replayer 1'} price={1} stack={2} yourStack={3} account={account} />
						<PriceColumn className={'middle'} name={'relayer 2'} price={2} stack={3} yourStack={2} account={account} />
						<PriceColumn className={'right'} name={'relayer 2'} price={2} stack={3} yourStack={2} account={account} />
					</SDivFlexCenter> : ""},
				{this.props.res.length > 6 ? <SDivFlexCenter center horizontal marginBottom="10px;">
					<PriceColumn className={'left down'} name={'replayer 1'} price={1} stack={2} yourStack={3} account={account} />
					<PriceColumn className={'middle down'} name={'relayer 2'} price={2} stack={3} yourStack={2} account={account} />
					<PriceColumn className={'right down'} name={'relayer 2'} price={2} stack={3} yourStack={2} account={account} />
				</SDivFlexCenter> : ""}
			</div>] : <Spin style={{ position: 'relative', top: '150px' }} tip="Loading....." />}
		</Layout>;
	}
}
