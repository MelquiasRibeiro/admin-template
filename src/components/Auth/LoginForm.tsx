'use client';

import {
	Paper,
	TextInput,
	PasswordInput,
	Group,
	Checkbox,
	Anchor,
	Button,
} from '@mantine/core';
import { useAuth } from '../../hooks/auth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/providers/auth';
import { useRouter } from 'next/navigation';

export function LoginForm() {
	const { authLoading, signIn } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { user, loading } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			alert('Voce já esta logado');
			router.push('/dashboard'); // Redireciona para o dashboard se o usuário estiver logado
		}
	}, [user, router]);

	if (loading) {
		return <p>Carregando...</p>;
	}

	const handleLogin = () => {
		signIn(email, password);
	};

	return (
		<Paper withBorder shadow="md" p={30} mt={30} radius="md">
			<TextInput
				label="Email"
				placeholder="test@example.com"
				type="email"
				required
				onChange={e => setEmail(e.target.value)}
			/>
			<PasswordInput
				label="Password"
				placeholder="Your password"
				required
				mt="md"
				onChange={e => setPassword(e.target.value)}
			/>
			<Group position="apart" mt="md">
				<Checkbox label="Remember me" />
				<Anchor size="sm" href="#">
					Forgot Password？
				</Anchor>
			</Group>
			<Button fullWidth mt="xl" onClick={() => handleLogin()} loading={authLoading}>
				Sign In
			</Button>
		</Paper>
	);
}
