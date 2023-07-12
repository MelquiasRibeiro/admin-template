'use client';

import React from 'react';
import { Box, Button, Paper, Space, Text, TextInput, Group } from '@mantine/core';
import { useCategories } from '../../hooks/useCategories';
import { useForm } from '@mantine/form';

const CategoryForm: React.FC = () => {
	const { storeCategory } = useCategories();
	const form = useForm({
		initialValues: {
			name: '',
			thumb: '',
		},
	});

	async function handleSaveCategory(values: any) {
		await storeCategory(values);
	}

	return (
		<>
			<Paper withBorder shadow="md" p="md" w="700px">
				<form onSubmit={form.onSubmit(values => handleSaveCategory(values))}>
					<Box<'REGISTER CATEGORY'> component={'symbol'}>
						<Text<'h2'> component="h2" fw="bold" fz="lg">
							REGISTER CATEGORY
						</Text>
						<TextInput label="Name" {...form.getInputProps('name')} />
						<Space h="sm" />
						<TextInput label="Thumb Url" {...form.getInputProps('thumb')} />
						<Space h="sm" />
						<Group position="center" mt="md">
							<Button type="submit">Register</Button>
							<Space h="sm" />
						</Group>
					</Box>
				</form>
			</Paper>
		</>
	);
};

export default CategoryForm;
