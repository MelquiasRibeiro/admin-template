import { useEffect, useReducer } from 'react';
import { collection, getDocs } from 'firebase/firestore';
//import { showErrorToast } from '../utils/toast';
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

	// useEffect(() => {
	// 	getAllCategories();
	// }, []);

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
	return {
		getAllCategories,
		categories: state.categories,
		categoriesError: state.error,
		categoriesLoading: state.loading,
	};
}
