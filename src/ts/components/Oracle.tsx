import { Layout } from 'antd';
import * as React from 'react';
// import { SContent } from './_styled';
import { SDivFlexCenter } from './_styled';
import PriceColumn from './Cards/PriceColumn';
import Header from './Header';

export interface IProps {
	account: string;
	// signedIn: boolean;
}

export default class Admin extends React.PureComponent<IProps> {
	// constructor(props: IAdminProps) {
	// 	super(props);
	// }
	public render() {
		const { account } = this.props;
		// const { signedIn } = this.props;
		// console.log(signedIn);
		return (
			<Layout>
				<Header />
				<SDivFlexCenter center horizontal marginBottom="10px;">
					<PriceColumn name={"replayer 1"} price={1} stack={2} yourStack={3} account={account}/>
					<PriceColumn name={"relayer 2"} price={2} stack={3} yourStack={2}  account={account}/>
					<PriceColumn name={"replayer 1"} price={1} stack={2} yourStack={3}  account={account}/>
				</SDivFlexCenter>
				<SDivFlexCenter center horizontal marginBottom="10px;">
					<PriceColumn name={"replayer 1"} price={1} stack={2} yourStack={3}  account={account}/>
					<PriceColumn name={"relayer 2"} price={2} stack={3} yourStack={2}  account={account}/>
					<PriceColumn name={"relayer 2"} price={2} stack={3} yourStack={2}  account={account}/>
				</SDivFlexCenter>
				<SDivFlexCenter center horizontal marginBottom="10px;">
					<PriceColumn name={"replayer 1"} price={1} stack={2} yourStack={3}  account={account}/>
					<PriceColumn name={"relayer 2"} price={2} stack={3} yourStack={2}  account={account}/>
					<PriceColumn name={"relayer 2"} price={2} stack={3} yourStack={2}  account={account}/>
				</SDivFlexCenter>
			</Layout>
		);
	}
}
