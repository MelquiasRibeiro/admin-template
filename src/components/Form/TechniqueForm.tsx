/* eslint-disable @next/next/no-img-element */
'use client';

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
import { useForm } from 'react-hook-form';
import { useGetVideoThumb } from '../../hooks/useGetVideoThumb';
import { useCategories } from '../../hooks/useCategories';
import { useUser } from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { verifyYouTubeUrl } from '@/utils/verifyYouTubeUrl';
import { useTechniques } from '../../hooks/useTechnique';

export const TechniqueForm = () => {
	const { getYouTubeThumbnail, videoThumbnail } = useGetVideoThumb();
	const { getAllCategories } = useCategories();
	const { storeTechnique } = useTechniques();
	const { getUserData } = useUser();

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

	const onSubmit = async data => {
		const userReference = await getUserData();

		const dataToSend = {
			created_by: userReference,
			name: data.title,
			thumb: videoThumbnail,
			details: {
				description: data.description,
				videoLink: videoUrl,
				tips: [],
				topFightersUsers: [],
			},
			categoreis: selectedCategoreis,
		};
		await storeTechnique(dataToSend);
	};

	return (
		<>
			<Paper withBorder shadow="md" p="md" w="700px">
				<Box<'REGISTER TECHNIQUE'> component={'symbol'}>
					<Text<'h2'> component="h2" fw="bold" fz="lg">
						REGISTER TECHNIQUE
					</Text>
					<TextInput label="Url" onChange={e => onUrlChange(e.target.value)} />
					<Space h="sm" />
					<TextInput label="Title" {...register('title')} />
					<Space h="sm" />
					<Textarea label="Description" {...register('description')} />
					<Space h="sm" />
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
