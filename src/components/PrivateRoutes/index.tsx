import React, { ReactNode, use, useEffect, useState } from 'react';
import { ROUTES } from '../../constants/routes';
import { useRouter } from 'next/navigation';
import { isUserAuthenticated } from '../../utils/checkUserAuth';
import firebase_app from '@/config/firebase';
import { getAuth } from 'firebase/auth';

type PrivateRoutesProps = {
	children: ReactNode;
};

const PrivateRoutes: React.FC = ({ children }: PrivateRoutesProps) => {
	const { push } = useRouter();

	const [user, setUser] = useState(null);
	const auth = getAuth(firebase_app);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(_user => {
			setUser(_user);
		});
		return unsubscribe;
	}, [auth]);

	useEffect(() => {
		if (!isUserAuthenticated) {
			push(ROUTES.public.login.name);
		}
	}, [user, push]);

	return (
		<>
			{!user && null}
			{user && children}
		</>
	);
};

export default PrivateRoutes;
