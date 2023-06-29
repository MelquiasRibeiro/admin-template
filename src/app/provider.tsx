'use client';
import React from 'react';
import { theme } from '@/styles/theme';
import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
	createEmotionCache,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useConfigStore } from '@/stores/config';
import rtlPlugin from 'stylis-plugin-rtl';
import RootStyleRegistry from './emotion';
import { checkIfRouteIsPublic } from '@/utils/isPublicRoute';
import { usePathname } from 'next/navigation';
import PrivateRoutes from '@/components/PrivateRoutes';
import { AuthProvider } from '../providers/auth';

type AppProviderProps = {
	children: React.ReactNode;
};

const queryClient = new QueryClient();

const rtlCache = createEmotionCache({
	key: 'mantine-rtl',
	prepend: true,
	stylisPlugins: [rtlPlugin],
});

export function AppProvider({ children }: AppProviderProps) {
	const { colorScheme, direction, setColorScheme } = useConfigStore();
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	const pathName = usePathname();
	const isPublicPage = checkIfRouteIsPublic(pathName);

	return (
		<QueryClientProvider client={queryClient}>
			<RootStyleRegistry>
				<ColorSchemeProvider
					colorScheme={colorScheme}
					toggleColorScheme={toggleColorScheme}
				>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						emotionCache={direction === 'rtl' ? rtlCache : undefined}
						theme={{ ...theme, colorScheme, dir: direction }}
					>
						<ModalsProvider>
							<AuthProvider>
								{isPublicPage && children}
								{!isPublicPage && <PrivateRoutes>{children}</PrivateRoutes>}
							</AuthProvider>
						</ModalsProvider>
						<Notifications />
					</MantineProvider>
				</ColorSchemeProvider>
			</RootStyleRegistry>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	);
}
