import { Box, Drawer, Header, Stack, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { DirectionSwitcher } from '../DirectionSwitcher/DirectionSwitcher';
import { UserButton } from '../UserButton/UserButton';
import { AuthContext } from '@/providers/auth';
import { useContext } from 'react';

interface Props {
	burger?: React.ReactNode;
}

const useStyles = createStyles(theme => ({
	header: {
		padding: theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		boxShadow: '1px 1px 3px rgba(0, 0, 0, .25)',
	},
}));

export function AdminHeader({ burger }: Props) {
	const { classes } = useStyles();
	const [opened, { close, open }] = useDisclosure(false);
	const { user } = useContext(AuthContext);

	return (
		<Header height={60} withBorder={false} className={classes.header}>
			{burger && burger}

			<Box sx={{ flex: 1 }} />
			{/* <ActionIcon onClick={open}>
				<IconSettings size="1.25rem" />
			</ActionIcon> */}
			<UserButton
				image={user?.photoURL || null}
				name={user?.displayName || 'user name'}
				email={user?.email || 'user@mail.com'}
			/>

			<Drawer opened={opened} onClose={close} title="Settings" position="right">
				<Stack spacing="lg">
					<ThemeSwitcher />
					<DirectionSwitcher />
				</Stack>
			</Drawer>
		</Header>
	);
}
