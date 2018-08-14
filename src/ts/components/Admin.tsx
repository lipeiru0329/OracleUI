import { Layout } from 'antd';
import * as React from 'react';
import { SContent } from './_styled';
import AuthCard from './Cards/AuthCard';

export interface IAdminProps {
	signedIn: boolean;
}

export default class Admin extends React.PureComponent<IAdminProps> {
	constructor(props: IAdminProps) {
		super(props);
	}
	public render() {
		const { signedIn } = this.props;
		return (
			<Layout>
				{signedIn ? (
					<Layout>
						<SContent>
							<div>Signed In</div>
						</SContent>
					</Layout>
				) : (
					<Layout>
						<SContent>
							<AuthCard />
						</SContent>
					</Layout>
				)}
			</Layout>
		);
	}
}
