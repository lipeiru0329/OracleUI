import { connect } from 'react-redux';
// import { IState } from 'ts/common/types';
import Oracle from 'ts/components/Oracle';
import { IState } from 'ts/common/types';

function mapStateToProps(state: IState) {
	return {
		account: state.web3.account
	};
}

export default connect(mapStateToProps, {})(Oracle);
