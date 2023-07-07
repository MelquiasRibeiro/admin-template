import { useReducer } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import firebase_app from '../config/firebase';

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
			const { payload } = action;
			return { ...state, loading: false, categories: payload };
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

export function useTechniques() {
	// HOOKS
	const [state, dispatch] = useReducer(reducer, initialState);
	const firestore = getFirestore(firebase_app);

	async function getAllTechniques() {
		try {
			const categoriesRef = collection(firestore, 'techniques');
			const snapshot = await getDocs(categoriesRef);
			const categoriesData = snapshot.docs.map(doc => {
				const data = doc.data();
				return {
					...data,
				};
			});
			console.log(categoriesData);
			return categoriesData;
		} catch (error) {
			console.error('Erro ao obter as techniques:', error);
			return [];
		}
	}

	async function searchTechniqueByUrl(videoLink: string) {
		try {
			const techniquesRef = collection(firestore, 'techniques');
			const q = query(techniquesRef, where('details.videoLink', '==', videoLink));
			const snapshot = await getDocs(q);
			if (snapshot.empty) {
				console.log('this video has not yet been registered ', videoLink);
				return null;
			}

			const techniquesData = snapshot.docs[0].data();

			return {
				reference: snapshot.docs[0].ref,
				...techniquesData,
			};
		} catch (error) {
			console.error('Erro ao obter as techniques:', error);
			return [];
		}
	}
	return {
		getAllTechniques,
		searchTechniqueByUrl,
		techniquesError: state.error,
		techniquesLoading: state.loading,
	};
}
