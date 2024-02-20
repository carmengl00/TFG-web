import { paths } from '@/globals/paths';
import { getDayOfWeek, getDaysBetweenDates } from '@/utils/getDaysBetweenDates';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { useConnect } from './connect';
import { weekdays } from './constants';

const FormSchema = z.object({
	weekdays: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'You have to select at least one item.',
	}),
});

interface CheckboxReactHookFormMultipleProps {
	resourceId: string;
	startDate: Date;
	endDate: Date;
}

export const CheckboxReactHookFormMultiple = ({
	resourceId,
	startDate,
	endDate,
}: CheckboxReactHookFormMultipleProps) => {
	const {
		timeSlots,
		setTimeSlots,
		handleAddTimeSlot,
		handleRemoveTimeSlot,
		createDayAvailability,
	} = useConnect();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			weekdays: ['recents', 'home'],
		},
	});

	const { push } = useRouter();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const days = getDaysBetweenDates(startDate, endDate, data.weekdays);
			for (const day of days) {
				const dayOfWeek = getDayOfWeek(day);
				for (const timeSlot of timeSlots[dayOfWeek]) {
					const response = await createDayAvailability({
						resourceId: resourceId,
						input: {
							day: day,
							startTime: timeSlot[0],
							endTime: timeSlot[1],
						},
					});
				}
			}
			await push(paths.public.home);
		} catch (error) {
			console.error(error);
		}
	}

	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	useEffect(() => {
		form.setValue('weekdays', selectedItems);
	}, [form.setValue, selectedItems]);

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
				className="space-y-8 mt-10 ml-32"
			>
				<FormField
					control={form.control}
					name="weekdays"
					render={() => (
						<FormItem>
							<div className="mb-4">
								<FormLabel className="text-base">
									Disponibilidad diaria
								</FormLabel>
								<FormDescription>
									Selecciona los días y franjas horarias en los que tu recurso
									estará disponible
								</FormDescription>
							</div>
							{weekdays.map((item) => (
								<FormItem
									key={item.id}
									className="flex items-center space-x-3 space-y-0"
								>
									<FormControl>
										<Checkbox
											checked={selectedItems.includes(item.id)}
											onCheckedChange={(checked) => {
												setSelectedItems((prevSelectedItems) =>
													checked
														? [...prevSelectedItems, item.id]
														: prevSelectedItems.filter((id) => id !== item.id)
												);
											}}
										/>
									</FormControl>
									<FormLabel className="font-normal text-lg">
										{item.label}
									</FormLabel>
									{selectedItems.includes(item.id) ? (
										<>
											<div className="flex flex-col">
												{timeSlots[item.id]?.map((timeSlot, slotIndex) => (
													<div
														key={`${item.id}-${slotIndex}`}
														className="flex items-center space-x-2"
													>
														<FormItem>
															<FormControl>
																<Input
																	placeholder="Hora de inicio"
																	type="time"
																	value={timeSlot[0]}
																	onChange={(e) => {
																		const newTimeSlots = { ...timeSlots };
																		newTimeSlots[item.id][slotIndex][0] =
																			e.target.value;
																		setTimeSlots(newTimeSlots);
																	}}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>

														<p className="mx-2"> - </p>
														<FormItem>
															<FormControl>
																<Input
																	placeholder="Hora de final"
																	type="time"
																	value={timeSlot[1]}
																	onChange={(e) => {
																		const newTimeSlots = { ...timeSlots };
																		newTimeSlots[item.id][slotIndex][1] =
																			e.target.value;
																		setTimeSlots(newTimeSlots);
																	}}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
														{timeSlots[item.id]?.length >= 1 && (
															<X
																onClick={() =>
																	handleRemoveTimeSlot(item.id, slotIndex)
																}
															/>
														)}
													</div>
												))}
											</div>
											<div className="flex items-center space-x-2">
												<PlusCircle
													onClick={() => handleAddTimeSlot(item.id)}
												/>
											</div>
										</>
									) : (
										<div className="flex items-center space-x-2">
											<p className="text-red-600">No seleccionado</p>
										</div>
									)}
								</FormItem>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Continuar</Button>
			</form>
		</Form>
	);
};
