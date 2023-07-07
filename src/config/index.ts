import { NavItem } from '@/types/nav-item';
import {
	IconComponents,
	IconDashboard,
	IconLock,
	IconMoodSmile,
} from '@tabler/icons-react';

export const navLinks: NavItem[] = [
	// { label: 'Dashboard', icon: IconDashboard, link: '/dashboard' },

	{
		label: 'Records',
		icon: IconComponents,
		initiallyOpened: true,
		links: [
			{
				label: 'Register category',
				link: '/dashboard/category',
			},
			{
				label: 'Register Technique',
				link: '/dashboard/technique',
			},
		],
	},
	// {
	// 	label: 'Auth',
	// 	icon: IconLock,
	// 	initiallyOpened: true,
	// 	links: [
	// 		{
	// 			label: 'Login',
	// 			link: '/login',
	// 		},
	// 		{
	// 			label: 'Register',
	// 			link: '/register',
	// 		},
	// 	],
	// },
	// {
	// 	label: 'Sample',
	// 	icon: IconMoodSmile,
	// 	initiallyOpened: true,
	// 	links: [
	// 		{
	// 			label: 'Landing',
	// 			link: '/',
	// 		},
	// 	],
	// },
];
