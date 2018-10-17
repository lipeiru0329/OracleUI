import { Layout } from 'antd';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
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
							<Switch>
								<Route render={() => <div>Signed In</div>} />
							</Switch>
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
