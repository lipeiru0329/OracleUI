import { combineReducers } from 'redux';
import { firebaseReducer } from './firebaseReducer';
import { web3Reducer } from './web3Reducer';
import { wsReducer } from './wsReducer';

const reducers = combineReducers({
	firebase: firebaseReducer,
	web3: web3Reducer,
	ws: wsReducer
});

export default reducers;
