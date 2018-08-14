import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class FirebaseUtil {
	/**********************************************************
	 *
	 * authentication
	 *
	 **********************************************************/
	private translateFirebaseError(errorCode: string, errorMessage: string): string {
		switch (errorCode) {
			case 'auth/user-not-found':
				return 'Invalid user. Please sign up or log in by other method.';
			case 'auth/wrong-password':
				return 'Invalid password. Please try again.';
			case 'auth/weak-password':
				return 'Password too weak. Please try again.';
			case 'auth/email-already-in-use':
			case 'auth/account-exists-with-different-credential':
				return 'Already signed up. Please log in via the correct method.';
			case 'auth/invalid-email':
				return 'Invalid email. Please try again.';
			default:
				return errorMessage;
		}
	}

	public async emailSignIn(email: string, password: string) {
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password);
			return '';
		} catch (error) {
			return this.translateFirebaseError(error.code, error.message);
		}
	}

	public signOut() {
		return firebase.auth().signOut();
	}
	/**********************************************************
	 *
	 * fetch bot data
	 *
	 **********************************************************/
}

const firebaseUtil = new FirebaseUtil();
export default firebaseUtil;
