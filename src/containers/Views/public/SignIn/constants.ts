import * as z from "zod"
import { FormValues } from "./types";

export const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
  })
  
export const defaultValues: FormValues = {
    email: '',
    password: '',
};