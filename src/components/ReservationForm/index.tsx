import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { FormSchema } from './constants';

interface ReservationFormProps {
	schedule: Schedule | undefined;
}

export const ReservationForm = ({ schedule }: ReservationFormProps) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(values: z.infer<typeof FormSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
				className="w-full flex flex-col items-center justify-center"
			>
				<div className="flex flex-col w-5/6 h-5/6 bg-white border border-gray-200 rounded-lg">
					<div className="flex items-center justify-center">
						Rellena con tus datos:
					</div>
					<div className="mt-4 ml-10 w-3/5">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
									</FormControl>
									<FormDescription>Introduce tu nombre.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="mt-4 ml-10 w-3/5">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
									</FormControl>
									<FormDescription>
										Se te enviará un correo con los detalles.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="mt-4 ml-10 w-3/5">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripción</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
									</FormControl>
									<FormDescription>
										Indica los detalles de la reserva (opcional)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button className="mt-10 w-32 self-center" type="submit">
						Reservar
					</Button>
				</div>
			</form>
		</Form>
	);
};
