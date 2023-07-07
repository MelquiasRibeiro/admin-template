'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	Box,
	Button,
	Paper,
	Space,
	Text,
	TextInput,
	MultiSelect,
	Textarea,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useGetVideoThumb } from '../../hooks/useGetVideoThumb';
import { useCategories } from '../../hooks/useCategories';
import { useEffect, useState } from 'react';
import { verifyYouTubeUrl } from '@/utils/verifyYouTubeUrl';
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
	const { getAllCategories } = useCategories();
	const [categoreis, setCategories] = useState<any>([]);
	const [selectedCategoreis, setSelectedCategories] = useState<string[] | []>([]);
	const [videoUrl, setVideoUrl] = useState('');
	useEffect(() => {
		async function getCategories() {
			const _categories = await getAllCategories();
			setCategories(_categories);
		}
		getCategories();
	}, []);

	const { register, handleSubmit } = useForm();

	const onUrlChange = (url: string) => {
		const isValidUrl = verifyYouTubeUrl(url);
		if (isValidUrl) {
			setVideoUrl(url);
			getYouTubeThumbnail(url);
		} else {
			console.log('url invalida');
		}
	};

	// const onSubmit = (data: User) =>
	// 	modals.openConfirmModal({
	// 		title: 'Register successfully',
	// 		children: <Text size="sm">{data.name}</Text>,
	// 		labels: { confirm: 'Confirm', cancel: 'Cancel' },
	// 		onConfirm: () => console.log('Confirmed'),
	// 	});
	const onSubmit = data => {
		const dataToSend = {
			name: data.title,
			thumb: videoThumbnail,
			details: {
				description: data.description,
				videoLink: videoUrl,
			},
			categoreis: selectedCategoreis,
		};

		console.log(dataToSend);
	};

	return (
		<>
			<Paper withBorder shadow="md" p="md" w="700px">
				<Box<'REGISTER TECHNIQUE'> component={'symbol'}>
					<Text<'h2'> component="h2" fw="bold" fz="lg">
						REGISTER TECHNIQUE
					</Text>
					<TextInput
						label="Url"
						onChange={e => onUrlChange(e.target.value)}
						//{...register('url')}
					/>
					<Space h="sm" />
					<TextInput label="Title" {...register('title')} />
					<Space h="sm" />
					<Textarea label="Description" {...register('description')} />
					<Space h="sm" />
					{/* <TextInput
						label="Tip"
						error={errors.tip && errors.tip.message}
						{...register('tip')}
					/>

					<Space h="sm" /> */}

					<MultiSelect
						data={categoreis}
						label="Categories"
						placeholder="Pick all categories to your technique"
						searchable
						nothingFound="Nothing found"
						value={selectedCategoreis}
						onChange={setSelectedCategories}
					/>
					<Space h="sm" />
					<Space h="sm" />
					<Paper withBorder shadow="md" p="md" w="300px">
						<Text<'h2'> component="h2" fw="bold" fz="lg">
							Thumb
						</Text>
						<img
							src={videoThumbnail}
							width={250}
							height={200}
							alt="Picture of the author"
						/>
					</Paper>
					<Space h="md" />
					<Button onClick={handleSubmit(onSubmit)}>Register</Button>
				</Box>
			</Paper>
		</>
	);
};
