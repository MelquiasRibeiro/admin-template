import { useState } from 'react';
import {
	Text,
	Image,
	SimpleGrid,
	Center,
	Paper,
	Box,
	Input,
	Stack,
	BackgroundImage,
	Flex,
	ScrollArea,
	Space,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { theme } from '@/styles/theme';
import frame from '../../../../assets/images/frame.svg';
const MainInformation: React.FC = () => {
	const [files, setFiles] = useState<FileWithPath[]>([]);
	const [title, setTitle] = useState<string>('');

	const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file);
		return (
			<Image
				key={index}
				src={imageUrl}
				alt="preview"
				width={400}
				imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
			/>
		);
	});
	return (
		<Flex direction="row">
			<Paper withBorder shadow="md" p="md" w="600px">
				<Box<'REGISTER TECHNIQUE'> component={'symbol'}>
					<Center>
						<Stack>
							<Input
								placeholder="add a title to your train"
								required
								onChange={e => setTitle(e.target.value)}
							/>
							<Dropzone
								accept={IMAGE_MIME_TYPE}
								onDrop={setFiles}
								sx={theme => ({
									width: 500,
								})}
							>
								{previews.length > 0 ? null : <Text align="center">Drop image here</Text>}
								<Center>
									<SimpleGrid
										cols={1}
										breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
										mt={previews.length > 0 ? 'sm' : 0}
									>
										{previews}
									</SimpleGrid>
								</Center>
							</Dropzone>
						</Stack>
					</Center>
				</Box>
			</Paper>
			<BackgroundImage
				src={
					'https://static.vecteezy.com/system/resources/previews/011/047/536/original/smartphone-and-mobile-phone-free-png.png'
				}
				w={500}
				h={500}
			>
				<Center p="md">
					<ScrollArea>
						<Stack>
							<Space />
							<Text align="center" color="#000">
								{title ? title : 'choose a title'}
							</Text>
							{files.length > 0 ? (
								<Image
									sx={theme => ({
										maxWidth: 215,
									})}
									src={URL.createObjectURL(files[0])}
								/>
							) : null}
						</Stack>
					</ScrollArea>
				</Center>
			</BackgroundImage>
		</Flex>
	);
};

export default MainInformation;
