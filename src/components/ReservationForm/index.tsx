import { paths } from '@/globals/paths';
import { useSlotsActions } from '@/graphql/hooks/slots/useSlotsActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft } from 'lucide-react';
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
	resource: {
		id: string;
		name: string;
		description: string;
		availableTime: number;
		startDate: string;
		endDate: string;
		location?: string | undefined;
		user: {
			email: string;
			firstName: string;
			lastName: string;
		};
	};
	schedule: Schedule | undefined;
	resourceId: string;
	setShowSelectHour: React.Dispatch<React.SetStateAction<boolean>>;
	setSchedule: React.Dispatch<React.SetStateAction<Schedule | undefined>>;
	setShowSummary: React.Dispatch<React.SetStateAction<boolean>>;
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
	setDataReservation: React.Dispatch<
		React.SetStateAction<DataReservation | undefined>
	>;
}

export const ReservationForm = ({
	resource,
	schedule,
	resourceId,
	setShowSelectHour,
	setSchedule,
	setShowSummary,
	setShowForm,
	setDataReservation,
}: ReservationFormProps) => {
	const { createReservedSlot, sendEmailToReservedSlotUser } = useSlotsActions();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		try {
			if (schedule) {
				const formattedDay = format(new Date(schedule.day), 'yyyy-MM-dd', {
					locale: es,
				});
				await sendEmailToReservedSlotUser({
					resourceName: resource.name,
					resourceDescription: resource.description,
					email: data.email,
					name: data.name,
					description: data.description,
					adminEmail: resource.user.email,
					availableTime:
						resource.availableTime >= 60
							? `${String(resource.availableTime / 60)} hora(s)`
							: String(resource.availableTime),
					endTime: schedule.endTime,
					location: resource.location ?? '',
					startTime: schedule.startTime,
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
				if (response) {
					setShowForm(false);
					setShowSummary(true);
					setDataReservation({
						name: data.name,
						description: data.description,
						email: data.email,
					});
					setSchedule(schedule);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleBack = () => {
		setShowSelectHour(true);
		setSchedule(undefined);
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
									<FormLabel>Nombre</FormLabel>
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
										Indica los detalles de la reserva.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex flex-row mt-10 justify-between items-center">
						<ChevronLeft className="ml-10" type="button" onClick={handleBack} />
						<div className="flex justify-center flex-grow">
							<Button className="mr-12 w-32" type="submit">
								Reservar
							</Button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
};
