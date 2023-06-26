'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Space, Text, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useGetVideoThumb } from '../../hooks/useGetVideoThumb';
import Image from 'next/image';

const schema = z.object({
	name: z.string().min(1, { message: 'please, provide a name to register a thechnique' }),
	thumb: z.string().email('Email is not valid'),
	category: z.string().min(1, { message: 'please type a valid category' }),
	description: z.string().min(1, { message: 'please type a valid description' }),
	tip: z.string().min(1, { message: 'please type a valid tip' }),
	url: z.string().min(1, { message: 'please type a valid video URL' }),
});

type User = z.infer<typeof schema>;

export const SimpleForm = () => {
	const { getYouTubeThumbnail, videoThumbnail } = useGetVideoThumb();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>({
		resolver: zodResolver(schema),
	});

	const onUrlChange = (url: string) => {
		getYouTubeThumbnail(url);
	};

	const onSubmit = (data: User) =>
		modals.openConfirmModal({
			title: 'Register successfully',
			children: <Text size="sm">{data.name}</Text>,
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			onConfirm: () => console.log('Confirmed'),
		});

	return (
		<>
			<Paper withBorder shadow="md" p="md" w="700px">
				<Box<'REGISTER TECHNIQUE'> component={'symbol'}>
					<Text<'h2'> component="h2" fw="bold" fz="lg">
						REGISTER TECHNIQUE
					</Text>
					<TextInput
						label="Title"
						error={errors.name && errors.name.message}
						{...register('name')}
					/>
					<Space h="sm" />
					<TextInput
						label="Description"
						error={errors.description && errors.description.message}
						{...register('description')}
					/>
					<Space h="sm" />
					<TextInput
						label="Tip"
						error={errors.tip && errors.tip.message}
						{...register('tip')}
					/>
					<Space h="sm" />
					<TextInput
						label="Url"
						onChange={e => onUrlChange(e.target.value)}
						error={errors.url && errors.url.message}
						//{...register('url')}
					/>
					<Space h="sm" />

					<Space h="md" />
					<Button onClick={() => getYouTubeThumbnail('https://youtu.be/P1WqOM5RBUo')}>
						Register
					</Button>
				</Box>
			</Paper>
			<Paper withBorder shadow="md" p="md" w="300px">
				<Text<'h2'> component="h2" fw="bold" fz="lg">
					Thumb
				</Text>
				<img src={videoThumbnail} width={200} height={200} alt="Picture of the author" />
			</Paper>
		</>
	);
};
