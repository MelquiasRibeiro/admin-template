import { useContext, useReducer } from 'react';
import firebase_app from '../config/firebase';
import { ROUTES } from '../constants/routes';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	getAuth,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

const auth = getAuth(firebase_app);

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

			const token = user.user.refreshToken;
			const name = user.user.displayName;

			dispatch({ type: types.SUCCESS });
			router.push(ROUTES.private.dashboard.name);
		} catch (error) {
			console.log(error);
			dispatch({ type: types.ERROR });
		}
	};

	const signUp = async (email: string, password: string) => {
		dispatch({ type: types.FETCHING });
		try {
			const newUser = await createUserWithEmailAndPassword(auth, email, password);

			console.log(newUser);

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
