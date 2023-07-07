import { useReducer } from 'react';
import firebase_app from '../config/firebase';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const auth = getAuth(firebase_app);
const user = auth.currentUser;
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

export function useUploadImage() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const uploadImage = async (file: File): Promise<string> => {
		try {
			if (!user) {
				console.log('Usuário não autenticado');
				throw new Error('Usuário não autenticado');
			}

			//const storageRef = ref(storage);
			const imageName = `${user.uid}-${Date.now()}`;
			const imageRef = ref(storage, imageName);

			// Fazer o upload da imagem para o Firebase Storage
			const snapshot = await uploadBytes(imageRef, file);
			const downloadURL = await getDownloadURL(imageRef);

			console.log('Imagem enviada com sucesso:', downloadURL);

			return downloadURL;
		} catch (error) {
			console.error('Erro ao enviar a imagem:', error);
			throw error;
		}
	};

	return {
		uploadImage,
		uploadImageError: state.error,
		uploadImageLoading: state.loading,
	};
}
