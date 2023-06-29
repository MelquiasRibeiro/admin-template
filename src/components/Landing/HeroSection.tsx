'use client';

import { ROUTES } from '@/constants/routes';
import { Button, Container, Group, Text, Title, createStyles, rem } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const useStyles = createStyles(theme => ({
	inner: {
		paddingTop: `calc(${theme.spacing.xl} * 4)`,
		paddingBottom: `calc(${theme.spacing.xl} * 4)`,
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',

		[theme.fn.smallerThan('md')]: {
			marginRight: 0,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 900,
		lineHeight: 1.05,
		fontSize: rem(64),
		color: '#121826',

		[theme.fn.smallerThan('md')]: {
			maxWidth: '100%',
			fontSize: rem(34),
			lineHeight: 1.15,
		},
	},
	red: {
		color: '#C41D17',
	},

	subtitle: {
		paddingTop: theme.spacing.xl,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 800,
		lineHeight: 1.05,
		fontSize: rem(40),
		color: '#252B42',

		[theme.fn.smallerThan('md')]: {
			maxWidth: '100%',
			fontSize: rem(26),
			lineHeight: 1.15,
		},
	},

	description: {
		opacity: 0.75,
		maxWidth: rem(500),
		color: '#535F79',

		[theme.fn.smallerThan('md')]: {
			maxWidth: '100%',
		},
	},

	control: {
		paddingLeft: rem(40),
		paddingRight: rem(40),
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: rem(18),

		[theme.fn.smallerThan('md')]: {
			width: '100%',
		},
	},
}));

export function HeroSection() {
	const { classes } = useStyles();
	const router = useRouter();

	return (
		<Container pt="sm" size="lg">
			<div className={classes.inner}>
				<Title
					//variant="gradient"
					//gradient={{ from: 'brand', to: 'red' }}
					className={classes.title}
				>
					BJJ<span className={classes.red}>Partner</span>
				</Title>
				<Title className={classes.subtitle}>
					A platform to share content about Jiu-Jitsu
				</Title>

				<Text className={classes.description} mt={30}>
					A 100% collaborative platform with the aim of sharing content and techniques
					related to gentle art
				</Text>

				<Group mt={40}>
					<Button
						//variant="gradient"
						//gradient={{ from: 'brand', to: 'red' }}
						bg={'#C41D17'}
						size="lg"
						className={classes.control}
						onClick={() => {
							router.push(ROUTES.public.register.name);
						}}
						rightIcon={<IconArrowRight />}
					>
						Get started
					</Button>
				</Group>
			</div>
		</Container>
	);
}
