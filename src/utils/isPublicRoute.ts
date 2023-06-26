import { ROUTES } from '../constants/routes';

export const checkIfRouteIsPublic = (asPath: string) => {
	const publicRoutes = Object.values(ROUTES.public);

	return publicRoutes.some(objeto => objeto.name.includes(asPath));
};
