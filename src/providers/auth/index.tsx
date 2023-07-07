import { createContext, useState, useEffect } from 'react';
import firebase_app from '../../config/firebase';
import { User, getAuth } from 'firebase/auth';

interface AuthContextProps {
	user: User | null;
	loading: boolean;
}

const auth = getAuth(firebase_app);

const AuthContext = createContext<AuthContextProps>({
	user: null,
	loading: true,
});

type AuthProviderProps = {
	children: any;
};

const AuthProvider: React.FC = ({ children }: AuthProviderProps) => {
	console.log('auth', auth);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	console.error('fora do useeffect');

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authUser => {
			setUser(authUser);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
