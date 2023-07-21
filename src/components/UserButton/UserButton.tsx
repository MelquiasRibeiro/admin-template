import { ROUTES } from '@/constants/routes';
import {
	UnstyledButton,
	UnstyledButtonProps,
	Group,
	Avatar,
	Text,
	createStyles,
} from '@mantine/core';
import { useRouter } from 'next/navigation';

const useStyles = createStyles(theme => ({
	user: {
		display: 'block',
		padding: theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

		// '&:hover': {
		// 	backgroundColor:
		// 		theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
		// },
	},
}));

interface UserButtonProps extends UnstyledButtonProps {
	image: string;
	name: string;
	email: string;
	icon?: React.ReactNode;
}

export function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
	const { classes } = useStyles();
	const router = useRouter();
	function handleNavigateToProfile() {
		router.push(ROUTES.private.profile.name); // Redireciona para o dashboard se o usuário estiver logado
	}
	return (
		<UnstyledButton
			className={classes.user}
			{...others}
			onClick={handleNavigateToProfile}
		>
			<Group>
				<div style={{ flex: 1 }}>
					<Text size="sm" weight={500}>
						{name}
					</Text>

					<Text color="dimmed" size="xs">
						{email}
					</Text>
				</div>
				<Avatar src={image} radius="xl" />
			</Group>
		</UnstyledButton>
	);
}
