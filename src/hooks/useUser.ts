import { useReducer } from 'react';
import firebase_app from '../config/firebase';
import { getAuth, updateProfile, UserInfo } from 'firebase/auth';
import { getFirestore, doc } from 'firebase/firestore';

const auth = getAuth(firebase_app);
const user = auth.currentUser;
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

export function useUser() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const updateUserInfo = async (newUserInfo: UserInfo) => {
		try {
			if (!user) {
				console.log('Usuário não autenticado');
				throw new Error('Usuário não autenticado');
			}
			updateProfile(auth.currentUser!, newUserInfo);
			dispatch({ type: types.SUCCESS });

			console.log('Dados do userInfo atualizados com sucesso!');
		} catch (error) {
			dispatch({ type: types.ERROR });
			console.error('Erro ao atualizar os dados do userInfo:', error);
		}
	};

	function getUserRef() {
		if (user) {
			const userRef = doc(firestore, 'users', user.uid);
			return userRef;
		}

		return null;
	}

	return {
		updateUserInfo,
		getUserRef,
		userError: state.error,
		userLoading: state.loading,
	};
}
