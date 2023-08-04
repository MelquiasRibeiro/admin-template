'use client';

import {
	Paper,
	TextInput,
	PasswordInput,
	Group,
	Checkbox,
	Anchor,
	Button,
	LoadingOverlay,
	Box,
	Notification,
	Space,
} from '@mantine/core';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { IconX } from '@tabler/icons-react';

export function LoginForm() {
	const { authLoading, signIn } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<null | string>(null);

	const handleLogin = async () => {
		const rusult = await signIn(email, password);
		setError(rusult);
	};

	const handleCloseError = () => {
		setError(null);
	};
	return (
		<Paper withBorder shadow="md" p={30} mt={30} radius="md">
			<Box maw={400} pos="relative">
				<LoadingOverlay visible={authLoading} overlayBlur={2} />
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
			</Box>
			<Space h="md" />
			<Button fullWidth mt="xl" onClick={() => handleLogin()} loading={authLoading}>
				Sign In
			</Button>
			{error && (
				<Notification
					icon={<IconX size="1.1rem" />}
					onClose={handleCloseError}
					color="red"
				>
					{error}
				</Notification>
			)}
		</Paper>
	);
}
