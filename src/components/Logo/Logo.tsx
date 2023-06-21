import { Flex, Text, useMantineTheme } from '@mantine/core';
import LogoImage from '../../assets/bjj-logo-name.png';
import Image from 'next/image';

interface Props {
	width?: string;
	height?: string;
}

export const Logo: React.FC<Props> = ({ width, height }) => {
	const theme = useMantineTheme();
	return (
		<Flex direction="row" align="center" gap={4}>
			<Image src={LogoImage} width={130} height={30} alt="Picture of the author" />
			{/* <Text
				color={theme.colorScheme === 'light' ? 'dark' : 'white'}
				fw="bolder"
				size="xl"s
			>
				Mantine
				<Text component="span" fw="normal" c="red">
					Admin
				</Text>
			</Text> */}
		</Flex>
	);
};
