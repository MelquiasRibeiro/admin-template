import { useContext, useReducer } from 'react';
import firebase_app from '../config/firebase';
import { updateProfile, updatePhoneNumber, PhoneAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '@/providers/auth';
import {
	uploadBytes,
	ref as storageRef,
	getStorage,
	getDownloadURL,
} from 'firebase/storage';

const firestore = getFirestore(firebase_app);
const storage = getStorage();

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
	const { user } = useContext(AuthContext);
	const [state, dispatch] = useReducer(reducer, initialState);

	async function updateProfileData(updatedUser): Promise<boolean> {
		const { displayName, phoneNumber, team, photo } = updatedUser;

		if (user) {
			try {
				if (displayName && displayName !== '') {
					await updateProfile(user, {
						displayName,
					});
				}

				//=> ESTUDAR SOBRE CADASTRO DE TELEFONE
				// if (phoneNumber && phoneNumber !== '') {
				// 	const phoneCredential = PhoneAuthProvider.credential(
				// 		user.phoneNumber as string,
				// 		user.email as string
				// 	);
				// 	await updatePhoneNumber(user, phoneCredential);
				// }

				if (photo) {
					const imageName = `profile_photos/${user.uid}-${Date.now()}`;
					const storageReference = storageRef(storage, imageName);
					await uploadBytes(storageReference, photo);
					const photoURL = await getDownloadURL(storageReference);

					await updateProfile(user, {
						photoURL,
					});
				}

				return true;
			} catch (error) {
				console.error('Erro ao atualizar o perfil do usuário:', error);
				return false;
			}
		} else {
			return false;
		}
	}

	async function getUserData() {
		if (user) {
			const userRef = doc(firestore, 'users', user.uid);
			const userSnapshot = await getDoc(userRef);
			const userData = userSnapshot.data();
			return userRef;
		}

		return null;
	}

	return {
		getUserData,
		updateProfileData,
		userError: state.error,
		userLoading: state.loading,
	};
}
