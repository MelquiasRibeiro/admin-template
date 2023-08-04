'use client';

import { useState } from 'react';
import { Stepper, Button, Group, Space } from '@mantine/core';
import AddTechniques from './steps/AddTechniques';
import MainInformation from './steps/MainInformation';

export const TrainingSteper = () => {
	const [active, setActive] = useState(0);
	const nextStep = () => setActive(current => (current < 3 ? current + 1 : current));
	const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

	return (
		<>
			<Stepper active={active} onStepClick={setActive} breakpoint="sm">
				<Stepper.Step
					label="Main information"
					description="Choose a title and image to the train"
				>
					<MainInformation />
				</Stepper.Step>
				<Stepper.Step label="Second step" description="Verify email">
					<AddTechniques />
				</Stepper.Step>
				<Stepper.Step label="Final step" description="Get full access">
					Step 3 content: Get full access
				</Stepper.Step>
				<Stepper.Completed>
					Completed, click back button to get to previous step
				</Stepper.Completed>
			</Stepper>

			<Group position="center" mt="xl">
				<Button variant="default" onClick={prevStep}>
					Back
				</Button>
				<Button onClick={nextStep}>Next step</Button>
			</Group>
		</>
	);
};
