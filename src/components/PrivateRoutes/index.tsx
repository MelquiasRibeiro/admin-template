import React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../providers/auth';
import { ROUTES } from '@/constants/routes';

type PrivateRouteProps = {
	children: any;
};

const PrivateRoute: React.FC = ({ children }: PrivateRouteProps) => {
	const { user, loading } = useContext(AuthContext);
	const router = useRouter();

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
