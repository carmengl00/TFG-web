import { z } from 'zod';

export const daysOfWeekSpanish = [
	'Lunes',
	'Martes',
	'Miércoles',
	'Jueves',
	'Viernes',
	'Sábado',
	'Domingo',
];

export const FormSchema = z.object({
	weekdays: z
		.array(
			z.object({
				id: z.string(),
				label: z.string(),
				checked: z.boolean(),
				timeSlots: z.array(z.array(z.string())),
			})
		)
		.refine((value) => value.some((item) => item), {
			message: 'You have to select at least one item.',
		}),
});
