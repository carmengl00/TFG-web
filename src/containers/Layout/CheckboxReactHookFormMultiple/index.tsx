import {
	daysOfWeek,
	getDayOfWeek,
	getDaysBetweenDates,
} from '@/utils/getDaysBetweenDates';
import { isGraphqlMessageError } from '@/utils/isGraphqlMessageError';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, X } from 'lucide-react';
import { useState } from 'react';
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
import { FormSchema, daysOfWeekSpanish } from './constants';

interface CheckboxReactHookFormMultipleProps {
	isEdition: boolean;
	onButtonClick: () => void;
	resourceId: string;
	startDate: Date;
	endDate: Date;
}

export const CheckboxReactHookFormMultiple = ({
	isEdition,
	onButtonClick,
	resourceId,
	startDate,
	endDate,
}: CheckboxReactHookFormMultipleProps) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			weekdays: daysOfWeek.map((day, index) => ({
				checked: false,
				label: daysOfWeekSpanish[index],
				id: day,
				timeSlots: [['', '']],
			})),
		},
	});

	const {
		handleAddTimeSlot,
		handleRemoveTimeSlot,
		createOrUpdateAvailability,
		deleteAllAvailabilities,
	} = useConnect(form);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const checkedDays = data.weekdays
				.filter((day) => day.checked)
				.map((day) => ({
					id: day.id,
					timeSlots: day.timeSlots,
				}));
			const checkedDayIds = checkedDays.map((checkedDay) => checkedDay.id);
			const days = getDaysBetweenDates(startDate, endDate, checkedDayIds);

			const itemsToCreateOrUpdate = [];
			for (const day of days) {
				const timeSlots =
					checkedDays.find((checkedDay) => checkedDay.id === getDayOfWeek(day))
						?.timeSlots ?? [];
				const timeRange = timeSlots.map((timeSlot) => ({
					startTime: timeSlot[0],
					endTime: timeSlot[1],
				}));
				itemsToCreateOrUpdate.push({
					day: day,
					timeRange: timeRange,
				});
			}
			if (isEdition) {
				deleteAllAvailabilities(resourceId);
				await createOrUpdateAvailability({
					input: {
						resourceId: resourceId,
						items: itemsToCreateOrUpdate,
					},
				});
			} else {
				await createOrUpdateAvailability({
					input: {
						resourceId: resourceId,
						items: itemsToCreateOrUpdate,
					},
				});
			}

			onButtonClick();
		} catch (error) {
			if (isGraphqlMessageError(error)) {
				setErrorMessage(error.message);
			}
		}
	}

	const weekdays = form.watch('weekdays');

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
									estará disponible.
									{isEdition ? (
										<>
											<br />
											<span className="text-red-400">
												¡Atención! Editar las disponibilidades diarias eliminará
												las creadas y las disponibilidades personalizadas, para
												posteriormente crear las seleccionadas a continuación.
											</span>
										</>
									) : null}
								</FormDescription>
							</div>
							{weekdays.map((item) => (
								<FormItem
									key={item.id}
									className="flex items-center space-x-3 space-y-0"
								>
									<FormControl>
										<Checkbox
											checked={item.checked}
											onCheckedChange={() => {
												const newWeekdays = weekdays.map((day) => {
													if (day.id === item.id) {
														return {
															...day,
															checked: !day.checked,
														};
													}
													return day;
												});
												form.setValue('weekdays', newWeekdays);
											}}
										/>
									</FormControl>
									<FormLabel className="font-normal text-lg">
										{item.label}
									</FormLabel>
									{item.checked ? (
										<>
											<div className="flex flex-col">
												{item.timeSlots.map((timeSlot, slotIndex) => (
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
																		const newTimeSlots = [...item.timeSlots];
																		newTimeSlots[slotIndex][0] = e.target.value;
																		const newWeekdays = weekdays.map((day) => {
																			if (day.id === item.id) {
																				return {
																					...day,
																					timeSlots: newTimeSlots,
																				};
																			}
																			return day;
																		});
																		form.setValue('weekdays', newWeekdays);
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
																		const newTimeSlots = [...item.timeSlots];
																		newTimeSlots[slotIndex][1] = e.target.value;
																		form.setValue(
																			'weekdays',
																			weekdays.map((day) => {
																				if (day.id === item.id) {
																					return {
																						...day,
																						timeSlots: newTimeSlots,
																					};
																				}
																				return day;
																			})
																		);
																	}}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
														{item.timeSlots?.length >= 1 && (
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
				{errorMessage && <p className="mt-5 text-red-600">{errorMessage}</p>}
			</form>
		</Form>
	);
};
