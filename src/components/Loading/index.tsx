import React from 'react';
import { Anchor, Center, Container, Text, Title } from '@mantine/core';

const Loading: React.FC = () => {
	return (
		<Center
			sx={theme => ({
				minHeight: '100vh',
				color: theme.colorScheme === 'light' ? theme.colors.dark : theme.white,
				backgroundImage:
					theme.colorScheme === 'light'
						? 'linear-gradient(to top, #dfe9f3 0%, white 100%)'
						: 'linear-gradient(to top, #1a202c 0%, #2d3748 100%)',
			})}
		>
			<Container size="xs" sx={{ width: 480, paddingBottom: 16 }}>
				<Title
					align="center"
					sx={theme => ({
						fontFamily: `Greycliff CF, ${theme.fontFamily}`,
						fontWeight: 900,
					})}
				>
					Bjjpartner
				</Title>
				<Text>Loading...</Text>
			</Container>
		</Center>
	);
};

export default Loading;
