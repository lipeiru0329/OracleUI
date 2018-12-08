import { firebaseReducer, initialState } from './firebaseReducer';

describe('firebase reducer', () => {
	let state = initialState;

	test('default', () => {
		state = firebaseReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});
});
