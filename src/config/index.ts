import { NavItem } from '@/types/nav-item';
import { IconFileDescription, IconGraph, IconLockAccess } from '@tabler/icons-react';

export const navLinks: NavItem[] = [
	{
		label: 'Dashboard',
		icon: IconGraph,
		initiallyOpened: true,
		links: [{ label: 'Your Results', link: '/dashboard' }],
	},
	{
		label: 'Records',
		icon: IconFileDescription,
		initiallyOpened: true,
		links: [
			{
				label: 'Register Technique',
				link: '/dashboard/technique',
			},
			{
				label: 'Register Training',
				link: '/dashboard/training',
			},
		],
	},
	{
		label: 'Admin',
		icon: IconLockAccess,
		initiallyOpened: true,
		links: [
			{
				label: 'Register category',
				link: '/dashboard/category',
			},
		],
	},
];
