'use client';

import React, { useContext, useState } from 'react';
import {
	Box,
	Button,
	Paper,
	Space,
	Text,
	TextInput,
	Group,
	Avatar,
	FileButton,
	Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AuthContext } from '@/providers/auth';
import { useUser } from '../../hooks/useUser';
const ProfileForm: React.FC = () => {
	const { updateProfileData } = useUser();

	const [file, setFile] = useState<File | null>(null);
	const { user, userData } = useContext(AuthContext);
	const form = useForm({
		initialValues: {
			displayName: user?.displayName || '',
			team: '',
			phoneNumber: user?.phoneNumber || '',
		},
	});
	async function handleSaveProfile(values: any) {
		const updatedUser = { ...values, photo: file };
		console.log('values:', updatedUser);
		const result = await updateProfileData(updatedUser);

		console.log(result);
	}

	return (
		<>
			<Paper withBorder shadow="md" p="md" w="700px">
				<form onSubmit={form.onSubmit(values => handleSaveProfile(values))}>
					<Box<'UPDATE PROFILE'> component={'symbol'}>
						<Text<'h2'> component="h2" fw="bold" fz="lg">
							UPDATE PROFILE
						</Text>
						<Text>{userData?.profileType[0] || '???'}</Text>
						<Stack align="center" mt="md">
							<Avatar
								src={file ? URL.createObjectURL(file) : user?.photoURL}
								size="xl"
								radius="xl"
							></Avatar>
							<FileButton onChange={setFile} accept="image/png,image/jpeg">
								{props => <Button {...props}>Choose avatar</Button>}
							</FileButton>
						</Stack>

						<Space h="sm" />
						<TextInput label="Name" {...form.getInputProps('displayName')} />
						<Space h="sm" />
						<TextInput label="Email" disabled value={user?.email || ''} />
						<Space h="sm" />
						<TextInput
							label="Phone"
							placeholder="preciso implementar"
							disabled
							{...form.getInputProps('phoneNumber')}
						/>
						<Space h="sm" />
						<TextInput
							label="Team"
							placeholder="preciso implementar"
							disabled
							{...form.getInputProps('team')}
						/>
						<Space h="sm" />
						<Group position="center" mt="md">
							<Button type="submit">Save</Button>
							<Space h="sm" />
						</Group>
					</Box>
				</form>
			</Paper>
		</>
	);
};

export default ProfileForm;
