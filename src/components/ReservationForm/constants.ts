import { z } from 'zod';

export const FormSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email(),
	description: z.string().optional(),
});
