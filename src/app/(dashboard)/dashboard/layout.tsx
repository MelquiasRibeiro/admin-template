'use client';

import { AdminHeader } from '@/components/Headers/AdminHeader';
import { Navbar } from '@/components/Navbar/Navbar';
import { navLinks } from '@/config';
import { AuthContext } from '@/providers/auth';
import { AppShell, Burger, Container, Footer, MediaQuery, Text } from '@mantine/core';
import { useContext, useState } from 'react';

interface Props {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
	const { userData } = useContext(AuthContext);
	const [opened, setOpened] = useState(false);
	const IsAdmin = userData.profileType.includes('ADMIN');
	const routes = IsAdmin ? navLinks : navLinks.filter(objeto => objeto.label !== 'Admin');

	return (
		<AppShell
			layout="alt"
			sx={theme => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
				},
			})}
			navbar={<Navbar data={routes} hidden={!opened} />}
			navbarOffsetBreakpoint="sm"
			header={
				<AdminHeader
					burger={
						<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
							<Burger
								opened={opened}
								onClick={() => setOpened(o => !o)}
								size="sm"
								mr="xl"
							/>
						</MediaQuery>
					}
				/>
			}
			footer={
				<Footer height={50} p="md">
					<Text w="full" size="sm" align="center" color="gray">
						BJJpartner © 2023 Devape
					</Text>
				</Footer>
			}
		>
			<Container fluid>{children}</Container>
		</AppShell>
	);
}
