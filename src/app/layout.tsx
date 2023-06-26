import { AppProvider } from './provider';

export const metadata = {
	metadataBase: new URL('https://bjjpartner.devape.com.br/'),
	title: { default: 'Bjjpartner', template: '%s | Mantine Admin' },
	description: 'A plataform to share content aboout jiu-jitsu',
	keywords: ['Jiu-jitsu', 'Bjj', 'Fight', 'Martial arts', 'sport'],
	authors: [
		{
			name: 'Melquias',
			url: 'https://www.linkedin.com/in/melquias-ribeiro-a10639182/',
		},
	],
	creator: 'Melquias',
	openGraph: {
		type: 'website',
		locale: 'pt_BR',
		url: 'https://bjjpartner.devape.com.br/',
		site_name: 'Bjjpartner',
		description: 'A plataform to share content aboout jiu-jisu',
		siteName: 'Bjjpartner',
		images: '/static/images/banner.png',
	},

	manifest: 'https://mantine-admin.vercel.app/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en-US">
			<head />
			<body>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
