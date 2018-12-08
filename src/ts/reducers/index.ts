import { combineReducers } from 'redux';
import { firebaseReducer } from './firebaseReducer';
import { web3Reducer } from './web3Reducer';

const reducers = combineReducers({
	firebase: firebaseReducer,
	web3: web3Reducer
});

export default reducers;
