import React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../providers/auth';
import { ROUTES } from '@/constants/routes';

type PrivateRouteProps = {
	children: React.ReactNode;
};

const PrivateRoute: React.FC = ({ children }: PrivateRouteProps) => {
	const { user, loading } = useContext(AuthContext);
	const router = useRouter();

	console.log('user', user);
	if (loading) {
		return <p>Carregando...</p>;
	}

	if (!user) {
		router.push(ROUTES.public.login.name);
		return null;
	}

	return <>{children}</>;
};

export default PrivateRoute;
