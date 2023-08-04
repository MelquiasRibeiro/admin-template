import React from 'react';
import { Accordion, Box, Paper } from '@mantine/core';
// import { Container } from './styles';

const AddTechniques: React.FC = () => {
	return (
		<Paper withBorder shadow="md" p="md" w="700px">
			<Box<'REGISTER TECHNIQUE'> component={'symbol'}>
				<Accordion
					variant="separated"
					radius="md"
					chevronPosition="left"
					defaultValue="customization"
				>
					<Accordion.Item value="customization">
						<Accordion.Control>Customization</Accordion.Control>
						<Accordion.Panel>
							Colors, fonts, shadows and many other parts are customizable to fit your
							design needs
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value="flexibility">
						<Accordion.Control>Flexibility</Accordion.Control>
						<Accordion.Panel>
							Configure components appearance and behavior with vast amount of settings or
							overwrite any part of component styles
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value="focus-ring">
						<Accordion.Control>No annoying focus ring</Accordion.Control>
						<Accordion.Panel>
							With new :focus-visible pseudo-class focus ring appears only when user
							navigates with keyboard
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Box>
		</Paper>
	);
};

export default AddTechniques;
