import { useReducer } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
//import { showErrorToast } from '../utils/toast';
import firebase_app from '../config/firebase';

const types = {
	FETCHING: 'FETCHING',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
};

const initialState = {
	loading: false,
	error: null,
	categories: [],
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

export function useCategories() {
	// HOOKS
	const [state, dispatch] = useReducer(reducer, initialState);
	const firestore = getFirestore(firebase_app);

	async function getAllCategories() {
		try {
			const categoriesRef = collection(firestore, 'categories');
			const snapshot = await getDocs(categoriesRef);
			//console.log('snapshot', snapshot);
			const categoriesData = snapshot.docs.map(doc => {
				const data = doc.data();
				return {
					value: doc.ref,
					label: data.name,
				};
			});
			console.log(categoriesData);
			return categoriesData;
		} catch (error) {
			console.error('Erro ao obter as categorias:', error);
			return [];
		}
	}

	async function storeCategory(category) {
		try {
			const categoriesRef = collection(firestore, 'categories');
			const newDocRef = await addDoc(categoriesRef, category);

			console.log('Novo documento criado com ID:', newDocRef.id);
			return newDocRef.id;
		} catch (error) {
			console.error('Erro ao criar a categoria:', error);
			return null;
		}
	}
	return {
		getAllCategories,
		storeCategory,
		categories: state.categories,
		categoriesError: state.error,
		categoriesLoading: state.loading,
	};
}
