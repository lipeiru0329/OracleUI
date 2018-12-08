import 'css/style.css';
import 'firebase/auth';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'whatwg-fetch';
import * as web3Actions from './actions/web3Actions';
import * as wsAction from './actions/wsActions';
import Admin from './containers/AdminContainer';
import store from './store/store';
import Web3Util from './common/web3Util';
import wsUtil from './common/wsUtil';

const web3Util = new Web3Util(window, !__KOVAN__, '', false);
web3Util.onWeb3AccountUpdate((addr: string, network: number) => {
	if (
		addr.toLowerCase() !== store.getState().web3.account.toLowerCase() ||
		network !== store.getState().web3.network
	) {
		store.dispatch(web3Actions.accountUpdate(addr));
		store.dispatch(web3Actions.networkUpdate(network));
	}
});

wsUtil.connectToRelayer();

wsUtil.onConnection(
	res => store.dispatch(wsAction.updateResponse(res)),
	() => store.dispatch(wsAction.connectionUpdate(false))
);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<React.StrictMode>
				<Admin />
			</React.StrictMode>
		</Router>
	</Provider>,
	document.getElementById('app')
);
