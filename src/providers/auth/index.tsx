import { createContext, useState, useEffect } from 'react';
import firebase_app from '../../config/firebase';
import { User, getAuth } from 'firebase/auth';
import { useUser } from '../../hooks/useUser';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextProps {
	user: User | null;
	userData: any;
	loading: boolean;
}

const auth = getAuth(firebase_app);

const AuthContext = createContext<AuthContextProps>({
	user: null,
	loading: true,
	userData: null,
});

type AuthProviderProps = {
	children: any;
};

const AuthProvider: React.FC = ({ children }: AuthProviderProps) => {
	//const { getUserData } = useUser();

	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState<any>();
	const firestore = getFirestore(firebase_app);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async authUser => {
			setUser(authUser);
			if (authUser?.uid) {
				const userRef = doc(firestore, 'users', authUser.uid);
				const userSnapshot = await getDoc(userRef);
				const userData = userSnapshot.data();
				setUserData(userData);
			}

			setLoading(false);
		});
		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ user, userData, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
