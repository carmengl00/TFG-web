import { paths } from '@/globals/paths';
import { useSlotsActions } from '@/graphql/hooks/slots/useSlotsActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/router';
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
	resourceId: string;
}

export const ReservationForm = ({
	schedule,
	resourceId,
}: ReservationFormProps) => {
	const { createReservedSlot } = useSlotsActions();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const { push } = useRouter();

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		try {
			if (schedule) {
				const formattedDay = format(new Date(schedule.day), 'yyyy-MM-dd', {
					locale: es,
				});
				const response = await createReservedSlot({
					resourceId: resourceId,
					name: data.name,
					description: data.description,
					email: data.email,
					day: formattedDay,
					startTime: schedule?.startTime,
					endTime: schedule?.endTime,
				});
				if (response) await push(paths.public.home);
			}
		} catch (e) {
			console.log(e);
		}
	};

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
