import * as React from 'react';
// import * as CST from 'ts/common/constants';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardList, SCardTitle, SButton } from './_styled';
import { Input, Icon } from 'antd';
import { web3Util } from 'ts/common/web3Util';
import wsUtil from 'ts/common/wsUtil';
import moment from 'moment';

interface IProps {
	name: string;
	price: number;
	stack: number;
	yourStack: number;
	account: string;
	className: string;
}
interface IState {
	amount: number;
}

export default class PriceColumn extends React.Component<IProps, IState> {

	public constructor(props: IProps) {
		super(props);
		this.state = {
			amount: 0
		}
	}

	private handleAmountChange(e: string) {
		this.setState({
			amount: Number(e)
		});
	}

	private formatNumber(e: number) {
		return e.toString(16);
	}

	private prepareSign(e: string) {
		const account = 64 - e.length;
		let output = "0x";
		for (let i = 0; i < account; i++)
			output += "0"
		return output + e;
	}

	private signBid(amt: number) {
		const time = moment().valueOf() / 1000;
		// console.log(moment().valueOf());
		console.log(time);
		// const amount = this.formatNumber(amt);
		const temp = Number(time) | Number(amt);
		console.log(temp);
		console.log(this.props.account);
		console.log(this.prepareSign(temp.toString()));
		web3Util.web3PersonalSign(
			this.props.account, 
			this.prepareSign(this.formatNumber(temp))
		).then(result => wsUtil.addStack(time, this.props.name, amt, result));
	}

	public render() {
		const { name, price, stack, yourStack, className } = this.props;
		return (
			<SCard
				title={<SCardTitle>{name}</SCardTitle>}
				width="595px"
				margin={"5px"}
				className={className}
			>
				<SDivFlexCenter horizontal>
					<SCardList noMargin width="66%">
						<div className="status-list-wrapper">
							<ul>
								<li>
									<span className="title">Name</span>
									<span className="content">{name}</span>
								</li>
								<li>
									<span className="title">Price</span>
									<span className="content">{price}</span>
								</li>
								<li>
									<span className="title">Stack</span>
									<span className="content">{stack}</span>
								</li>
								<li>
									<span className="title">Your Stack</span>
									<span className="content">{yourStack}</span>
								</li>
							</ul>
						</div>
					</SCardList>
					<div
						style={{
							width: '34%',
							display: 'grid',
							justifyContent: 'center',
							alignItems: 'center',
							padding: '0px 10px',
						}}
					>
						<Input
							placeholder="Enter your Bid Amount"
							prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
							value={this.state.amount}
							onChange={e => this.handleAmountChange(e.target.value)}
						/>
						<SButton onClick={() => this.signBid(this.state.amount)}>Bid</SButton>
					</div>
				</SDivFlexCenter>
				{/* <SDivFlexCenter horizontal height="130px" padding="10px 0">
					<div style={{ width: '66%', border: '1px solid rgba(237,241,242,1)' }}>
						<img src={temp} style={{ width: '100%', height: '100%' }} />
					</div>
					<div
						style={{
							width: '34%',
							padding: '0px 10px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between'
						}}
					>
						<SCardList noMargin width="100%">
							<div className="status-list-wrapper">
								<ul>
									<li>
										<span className="title">aETH</span>
									</li>
									<li style={{ flexDirection: 'row-reverse' }}>
										<span className="content">1,234,567</span>
									</li>
								</ul>
							</div>
						</SCardList>
						<SButton onClick={toggleTradeDisplay}>TRADE aETH</SButton>
					</div>
				</SDivFlexCenter>
				<SDivFlexCenter horizontal height="130px" padding="10px 0">
					<div style={{ width: '66%', border: '1px solid rgba(237,241,242,1)' }}>
						<img src={temp} style={{ width: '100%', height: '100%' }} />
					</div>
					<div
						style={{
							width: '34%',
							padding: '0px 10px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between'
						}}
					>
						<SCardList noMargin width="100%">
							<div className="status-list-wrapper">
								<ul>
									<li>
										<span className="title">bETH</span>
									</li>
									<li style={{ flexDirection: 'row-reverse' }}>
										<span className="content">1,234,567</span>
									</li>
								</ul>
							</div>
						</SCardList>
						<SButton onClick={toggleTradeDisplay}>TRADE bETH</SButton>
					</div>
				</SDivFlexCenter> */}
			</SCard>
		);
	}
}
