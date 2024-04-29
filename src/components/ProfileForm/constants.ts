import { z } from 'zod';

export const FormSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	publicName: z.string(),
});
