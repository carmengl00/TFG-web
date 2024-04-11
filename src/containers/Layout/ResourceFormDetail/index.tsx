import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormSchema } from './constants';

export default function ResourceFormDetail({
	resource,
	onSubmit,
	date,
	setDate,
	errorMessage,
}: {
	resource:
		| {
				id: string;
				name: string;
				description: string;
				availableTime: number;
				startDate: string;
				endDate: string;
				location?: string | undefined;
				user: {
					email: string;
				};
		  }
		| undefined;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onSubmit: any;
	date: DateRange | undefined;
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	errorMessage: string | null;
}) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			time_measurement:
				resource?.availableTime && resource.availableTime >= 60
					? 'hours'
					: 'minutes',
		},
	});

	useEffect(() => {
		if (resource) {
			form.setValue('name', resource.name);
			form.setValue('description', resource.description);
			form.setValue(
				'available_time',
				resource.availableTime >= 60
					? resource.availableTime / 60
					: resource.availableTime
			);
			form.setValue('location', resource.location || '');
			const timeMeasurement =
				resource.availableTime >= 60 ? 'hours' : 'minutes';
			form.setValue('time_measurement', timeMeasurement);
		}
	}, [resource, form]);

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
				className="w-full mt-16 flex flex-row"
			>
				<div className="ml-10 w-3/5">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input type="name" {...field} />
								</FormControl>
								<FormDescription>
									Introduce el nombre del recurso.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex flex-row">
						<div className="w-1/2">
							<FormField
								control={form.control}
								name="available_time"
								render={({ field }) => (
									<FormItem className="mt-10">
										<FormLabel>Duración</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormDescription>
											Introduce la duración de la reserva del recurso.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-1/2 ml-10">
							<FormField
								control={form.control}
								name="time_measurement"
								render={({ field }) => (
									<FormItem className="mt-[72px]">
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecciona" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="hours">hora/s</SelectItem>
												<SelectItem value="minutes">minutos</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem className="mt-10">
								<FormLabel>Ubicación</FormLabel>
								<FormControl>
									<Input type="location" {...field} />
								</FormControl>
								<FormDescription>
									Introduce la ubicación del recurso.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="mt-10">
								<FormLabel>Descripción</FormLabel>
								<FormControl>
									<Input type="description" {...field} />
								</FormControl>
								<FormDescription>
									Introduce la decripción del recurso.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="mt-10 mb-5">
						<Button type="submit">Continuar</Button>
						{errorMessage && (
							<p className="mt-5 text-red-400">Error: {errorMessage}</p>
						)}
					</div>
				</div>
				<div className="w-2/5 ml-10">
					<p className="text-xl">Disponibilidad</p>

					<FormItem className="flex flex-col mt-10">
						<FormLabel>Rango de fechas</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn(
										'w-[300px] justify-start text-left font-normal',
										!date && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date?.from ? (
										date.to ? (
											<>
												{format(date.from, 'LLL dd, y')} -{' '}
												{format(date.to, 'LLL dd, y')}
											</>
										) : (
											format(date.from, 'LLL dd, y')
										)
									) : (
										<span>Selecciona un rango de fechas</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									initialFocus
									mode="range"
									defaultMonth={date?.from}
									selected={date}
									onSelect={setDate}
									numberOfMonths={2}
								/>
							</PopoverContent>
						</Popover>
						<FormDescription>
							Selecciona el rango de fechas en que estará disponible el recurso.
						</FormDescription>
						<FormMessage />
					</FormItem>
				</div>
			</form>
		</Form>
	);
}
