import { useReducer } from 'react';
import firebase_app from '../config/firebase';

import { ROUTES } from '../constants/routes';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	getAuth,
	updateProfile,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import { useRouter } from 'next/navigation';
import { useUser } from './useUser';
const auth = getAuth(firebase_app);
const firestore = getFirestore(firebase_app);

const types = {
	FETCHING: 'FETCHING',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
};

const initialState = {
	loading: false,
	error: null,
};

function reducer(state: any, action: any): any {
	switch (action.type) {
		case types.FETCHING: {
			return { ...state, loading: true };
		}

		case types.SUCCESS: {
			return { ...state, loading: false };
		}

		case types.ERROR: {
			const { error } = action;
			return { ...state, loading: false, error };
		}

		default: {
			return state;
		}
	}
}

export function useAuth() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const router = useRouter();

	const signIn = async (email: string, password: string) => {
		dispatch({ type: types.FETCHING });
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);

			dispatch({ type: types.SUCCESS });
			router.push(ROUTES.private.dashboard.name);
			return;
		} catch (error) {
			console.log(error);
			dispatch({ type: types.ERROR });
			return error.message;
		}
	};

	const signUp = async userInfo => {
		dispatch({ type: types.FETCHING });
		try {
			const { email, password, phone, name } = userInfo;
			const newUser = await createUserWithEmailAndPassword(auth, email, password);

			const updateInfo = {
				phoneNumber: phone,
				displayName: name,
			};
			await updateProfile(newUser.user, updateInfo);

			const userRef = doc(firestore, 'users', newUser.user.uid);
			await setDoc(userRef, {
				profileType: ['CREATOR'],
			});

			dispatch({ type: types.SUCCESS });
			router.push(ROUTES.private.dashboard.name);
		} catch (error) {
			console.log(error);
			dispatch({ type: types.ERROR });
		}
	};

	const logout = async () => {
		dispatch({ type: types.FETCHING });
		try {
			await signOut(auth);
			dispatch({ type: types.SUCCESS });
		} catch (error) {
			console.log(error);
			dispatch({ type: types.ERROR });
		}
	};

	return {
		signIn,
		signUp,
		logout,
		authError: state.error,
		authLoading: state.loading,
	};
}
