'use client';

import { useAuth } from '@/hooks/useAuth';
import { Paper, TextInput, PasswordInput, Space, Button } from '@mantine/core';
import { useState } from 'react';
import InputMask from 'react-input-mask';

export function RegisterForm() {
	const { authLoading, signUp } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const handleRegister = () => {
		const userInfo = { name, phone, password, email };
		signUp(userInfo);
	};

	return (
		<Paper withBorder shadow="md" p={30} mt={30} radius="md">
			<TextInput
				label="Full Name"
				placeholder="My Name "
				required
				onChange={e => setName(e.target.value)}
			/>
			<Space h="md" />
			<InputMask
				mask="+999(99)99999-9999"
				value={phone}
				onChange={e => setPhone(e.target.value)}
			>
				{
					//@ts-ignore
					inputProps => (
						<TextInput
							{...inputProps}
							label="Phone"
							placeholder="+55(98)98187-7537"
							required
						/>
					)
				}
			</InputMask>

			<Space h="md" />
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
