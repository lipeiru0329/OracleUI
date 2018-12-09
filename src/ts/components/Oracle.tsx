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
			{res !== undefined && Object.keys(this.props.res).length > 0 ? (<div style={{ margin: '10px' }}>
				<SDivFlexCenter center horizontal marginBottom="10px;">
					<PriceColumn className={'left top'} name={res[Object.keys(res)[0] as any].relayerID} price={Number(Number(res[Object.keys(res)[0] as any].price).toFixed(2))} stack={2} yourStack={res[Object.keys(res)[0] as any].accountId === this.props.account ? res[Object.keys(res)[0] as any].stakedAmt : 0} account={account} />
					<PriceColumn className={'middle top'} name={res[Object.keys(res)[1] as any].relayerID} price={Number(Number(res[Object.keys(res)[1] as any].price).toFixed(2))} stack={3} yourStack={res[Object.keys(res)[1] as any].accountId === this.props.account ? res[Object.keys(res)[1] as any].stakedAmt : 0} account={account} />
					<PriceColumn className={'right top'} name={res[Object.keys(res)[2] as any].relayerID} price={Number(Number(res[Object.keys(res)[2] as any].price).toFixed(2))} stack={2} yourStack={res[Object.keys(res)[2] as any].accountId === this.props.account ? res[Object.keys(res)[2] as any].stakedAmt : 0} account={account} />
				</SDivFlexCenter>,
				{this.props.res.length > 3 ?
					<SDivFlexCenter center horizontal marginBottom="10px;">
						<PriceColumn className={'left'} name={res[Object.keys(res)[3] as any].relayerID} price={Number(Number(res[Object.keys(res)[3] as any].price).toFixed(2))} stack={2} yourStack={res[Object.keys(res)[3] as any].accountId === this.props.account ? res[Object.keys(res)[3] as any].stakedAmt : 0} account={account} />
					<PriceColumn className={'middle'} name={res[Object.keys(res)[4] as any].relayerID} price={Number(Number(res[Object.keys(res)[4] as any].price).toFixed(2))} stack={3} yourStack={res[Object.keys(res)[4] as any].accountId === this.props.account ? res[Object.keys(res)[4] as any].stakedAmt : 0} account={account} />
					<PriceColumn className={'right'} name={res[Object.keys(res)[5] as any].relayerID} price={Number(Number(res[Object.keys(res)[5] as any].price).toFixed(2))} stack={2} yourStack={res[Object.keys(res)[5] as any].accountId === this.props.account ? res[Object.keys(res)[5] as any].stakedAmt : 0} account={account} />
					</SDivFlexCenter> : ""},
				{this.props.res.length > 6 ? <SDivFlexCenter center horizontal marginBottom="10px;">
				<PriceColumn className={'left down'} name={res[Object.keys(res)[6] as any].relayerID} price={Number(Number(res[Object.keys(res)[6] as any].price).toFixed(2))} stack={2} yourStack={res[Object.keys(res)[6] as any].accountId === this.props.account ? res[Object.keys(res)[6] as any].stakedAmt : 0} account={account} />
					<PriceColumn className={'middle down'} name={res[Object.keys(res)[7] as any].relayerID} price={Number(Number(res[Object.keys(res)[7] as any].price).toFixed(2))} stack={3} yourStack={res[Object.keys(res)[7] as any].accountId === this.props.account ? res[Object.keys(res)[7] as any].stakedAmt : 0} account={account} />
					<PriceColumn className={'right down'} name={res[Object.keys(res)[8] as any].relayerID} price={Number(Number(res[Object.keys(res)[8] as any].price).toFixed(2))} stack={2} yourStack={res[Object.keys(res)[8] as any].accountId === this.props.account ? res[Object.keys(res)[8] as any].stakedAmt : 0} account={account} />
				</SDivFlexCenter> : ""}
			</div>) : <Spin style={{ position: 'relative', top: '150px' }} tip="Loading....." />}
		</Layout>;
	}
}
