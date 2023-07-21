'use client';

import { ROUTES } from '@/constants/routes';
import { Anchor, Center, Container, Text, Title } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/providers/auth';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
interface Props {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
	const pathName = usePathname();
	const { user, loading } = useContext(AuthContext);
	const router = useRouter();

	const isLoginRoute = pathName === ROUTES.public.login.name;
	const routeToNavegate = isLoginRoute
		? ROUTES.public.register.name
		: ROUTES.public.login.name;

	useEffect(() => {
		if (user) {
			alert('Voce já esta logado');
			router.push(ROUTES.private.dashboard.name); // Redireciona para o dashboard se o usuário estiver logado
		}
	}, [user, router]);

	if (loading || user) {
		return <Loading />;
	}

	return (
		<Center
			sx={theme => ({
				minHeight: '100vh',
				color: theme.colorScheme === 'light' ? theme.colors.dark : theme.white,
				backgroundImage:
					theme.colorScheme === 'light'
						? 'linear-gradient(to top, #dfe9f3 0%, white 100%)'
						: 'linear-gradient(to top, #1a202c 0%, #2d3748 100%)',
			})}
		>
			<Container size="xs" sx={{ width: 480, paddingBottom: 16 }}>
				<Title
					align="center"
					sx={theme => ({
						fontFamily: `Greycliff CF, ${theme.fontFamily}`,
						fontWeight: 900,
					})}
				>
					Bjjpartner
				</Title>
				{isLoginRoute ? (
					<Text color="dimmed" size="sm" align="center" mt={5}>
						Don&apos;t have an account?{' '}
						<Anchor size="sm" href={routeToNavegate}>
							Sign Up
						</Anchor>
					</Text>
				) : (
					<Text color="dimmed" size="sm" align="center" mt={5}>
						Already have an account?{' '}
						<Anchor size="sm" href={routeToNavegate}>
							Sign In
						</Anchor>
					</Text>
				)}
				{children}
			</Container>
		</Center>
	);
}
