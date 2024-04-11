import { z } from 'zod';

export const FormSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	available_time: z.coerce
		.number()
		.min(0, 'Available time must be a positive number'),
	time_measurement: z.string({
		required_error: 'Please select a measurement to display.',
	}),
	location: z.string(),
});
