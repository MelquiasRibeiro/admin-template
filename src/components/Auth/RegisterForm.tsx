'use client';

import { useAuth } from '@/hooks/useAuth';
import { Paper, TextInput, PasswordInput, Space, Button } from '@mantine/core';
import { useState } from 'react';

export function RegisterForm() {
	const { authLoading, signUp } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const handleRegister = () => {
		const userInfo = { name, phone };
		signUp(email, password, userInfo);
	};

	return (
		<Paper withBorder shadow="md" p={30} mt={30} radius="md">
			<TextInput
				label="Name"
				placeholder="My Name "
				required
				onChange={e => setName(e.target.value)}
			/>
			<TextInput
				label="Phone"
				placeholder="+55(98)98187-7537"
				required
				onChange={e => setPhone(e.target.value)}
			/>
			<TextInput
				label="Email"
				placeholder="test@example.com"
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
			<Space h="md" />
			<Button fullWidth mt="xl" onClick={() => handleRegister()} loading={authLoading}>
				Sign Up
			</Button>
		</Paper>
	);
}
