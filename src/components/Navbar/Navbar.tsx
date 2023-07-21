import {
	Group,
	Navbar as MantineNavbar,
	ScrollArea,
	createStyles,
	rem,
	Button,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { NavItem } from '@/types/nav-item';
import { Logo } from '../Logo/Logo';
import { NavLinksGroup } from './NavLinksGroup';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const useStyles = createStyles(theme => ({
	navbar: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		paddingBottom: 0,
		boxShadow: '1px 1px 3px rgba(0, 0, 0, .15)',
	},

	links: {
		marginLeft: `calc(${theme.spacing.md} * -1)`,
		marginRight: `calc(${theme.spacing.md} * -1)`,
	},

	linksInner: {
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
	},

	footer: {
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
		paddingTop: theme.spacing.md,
		display: 'flex',
		justifyContent: 'center',
	},
}));

interface Props {
	data: NavItem[];
	hidden?: boolean;
}

export function Navbar({ data, hidden }: Props) {
	const { classes } = useStyles();
	const links = data.map(item => <NavLinksGroup key={item.label} {...item} />);
	const { logout } = useAuth();
	const router = useRouter();

	async function handleLogout() {
		await logout();
		router.push(ROUTES.public.login.name); // Redireciona para o dashboard se o usuário estiver logado
	}

	return (
		<MantineNavbar
			hidden={hidden}
			hiddenBreakpoint="sm"
			height="100vh"
			width={{ sm: 280 }}
			p="md"
			withBorder={false}
			className={classes.navbar}
		>
			<MantineNavbar.Section>
				<Group position="apart" h={rem(40)}>
					<Logo width={rem(30)} />
				</Group>
			</MantineNavbar.Section>
			<MantineNavbar.Section grow className={classes.links} component={ScrollArea}>
				<div className={classes.linksInner}>{links}</div>
			</MantineNavbar.Section>

			<MantineNavbar.Section className={classes.footer}>
				<Button
					rightIcon={<IconLogout size="0.9rem" />}
					variant="subtle"
					color="dark"
					onClick={handleLogout}
				>
					Logout
				</Button>
			</MantineNavbar.Section>
		</MantineNavbar>
	);
}
