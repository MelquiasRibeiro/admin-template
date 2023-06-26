import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase_app from '../config/firebase';

const auth = getAuth(firebase_app);

export function isUserAuthenticated() {
	onAuthStateChanged(auth, user => {
		if (user) {
			return true;
		} else {
			return false;
		}
	});
}
