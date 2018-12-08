import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Oracle from '../containers/OracleContainer';

export interface IAdminProps {
	signedIn: boolean;
}

export default class Admin extends React.PureComponent<IAdminProps> {
	constructor(props: IAdminProps) {
		super(props);
	}
	public render() {
		const { signedIn } = this.props;
		console.log(signedIn);
		return (
			<Switch>
				<Route render={() => <Oracle />} />
			</Switch>
		);
	}
}
