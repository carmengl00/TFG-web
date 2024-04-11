import { z } from 'zod';
import { FormSchema } from './constants';

export type FormValues = z.infer<typeof FormSchema>;
