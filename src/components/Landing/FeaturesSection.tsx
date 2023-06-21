'use client';

import {
	Container,
	Paper,
	SimpleGrid,
	Space,
	Text,
	ThemeIcon,
	Title,
	createStyles,
	rem,
} from '@mantine/core';
import { IconNumber1, IconNumber2, IconNumber3 } from '@tabler/icons-react';

export const featuresData = [
	{
		icon: IconNumber1,
		title: 'Register on the platform',
		description: 'Fill in your details and register to get started',
	},
	{
		icon: IconNumber2,
		title: 'Share content',
		description: 'you can register content and share tips ',
	},
	{
		icon: IconNumber3,
		title: 'Organize training',
		description:
			'assemble a workout with positions and exercises to compose a traing and share it through the app',
	},
];

interface FeatureProps {
	icon: React.FC<any>;
	title: React.ReactNode;
	description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
	return (
		<Paper shadow="md" px="lg" py="sm" radius="md" withBorder>
			<ThemeIcon variant="light" size={60} radius={60}>
				<Icon size="2rem" stroke={1.5} color="#fff" />
			</ThemeIcon>
			<Text mt="sm" mb={7} fw="600" color={'#252B42'}>
				{title}
			</Text>
			<Text size="sm" sx={{ lineHeight: 1.6 }} color={'#535F79'}>
				{description}
			</Text>
		</Paper>
	);
}

const useStyles = createStyles(theme => ({
	wrapper: {
		paddingTop: `calc(${theme.spacing.xl} * 4)`,
		paddingBottom: `calc(${theme.spacing.xl} * 4)`,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 900,
		lineHeight: 1.05,
		fontSize: rem(64),

		[theme.fn.smallerThan('md')]: {
			maxWidth: '100%',
			fontSize: rem(34),
			lineHeight: 1.15,
		},
	},

	description: {
		textAlign: 'center',

		[theme.fn.smallerThan('sm')]: {
			textAlign: 'left',
		},
	},
}));

interface FeaturesGridProps {
	title: React.ReactNode;
	description: React.ReactNode;
	data?: FeatureProps[];
}

export function FeaturesSection({
	title,
	description,
	data = featuresData,
}: FeaturesGridProps) {
	const { classes } = useStyles();
	const features = data.map((feature, index) => <Feature {...feature} key={index} />);

	return (
		<Container className={classes.wrapper}>
			<Title className={classes.title}>{title}</Title>
			<Space h="md" />

			<Container size={560} p={0}>
				<Text size="sm" className={classes.description}>
					{description}
				</Text>
			</Container>

			<SimpleGrid
				mt={60}
				cols={3}
				spacing="xl"
				breakpoints={[
					{ maxWidth: 'md', cols: 2, spacing: 'xl' },
					{ maxWidth: 'sm', cols: 1, spacing: 'xl' },
				]}
			>
				{features}
			</SimpleGrid>
		</Container>
	);
}
