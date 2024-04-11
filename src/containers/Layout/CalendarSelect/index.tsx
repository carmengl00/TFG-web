import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { paths } from '@/globals/paths';
import { useDayAvailabilityActions } from '@/graphql/hooks/myDayAvailability/useDayAvailabilityActions';
import { useMyDayAvailability } from '@/graphql/hooks/myDayAvailability/useMyDayAvailability';
import { formatDate } from '@/utils/formatDate';
import { isGraphqlMessageError } from '@/utils/isGraphqlMessageError';
import { isSameDay, isWithinInterval } from 'date-fns';
import { ChevronRight, PlusCircle, X } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useConnect } from './connect';

interface CalendarSelectProps {
	resourceId: string;
	isEdition: boolean;
	date: {
		from: Date;
		to: Date;
	};
	setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
	setShowCalendarSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CalendarSelect = ({
	resourceId,
	date,
	isEdition,
	setShowCheckbox,
	setShowCalendarSelect,
}: CalendarSelectProps) => {
	const form = useForm();
	const [selectedDays, setSelectedDays] = useState<SelectedDay[]>([]);
	const startDate = date.from;
	const endDate = date.to;
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { handleNewTime, handleRemoveEmptySlots, handleInputChange } =
		useConnect(setSelectedDays, selectedDays);

	const { getDaysAvailabilities } = useMyDayAvailability();
	const { createOrUpdateAvailability, deleteDayAvailability } =
		useDayAvailabilityActions();

	const getNewSelectedDay = async (day: Date): Promise<SelectedDay> => {
		const myDayAvailability = await getDaysAvailabilities({
			variables: {
				input: {
					resourceId: resourceId,
					month: day.getMonth() + 1,
					year: day.getFullYear(),
				},
			},
			fetchPolicy: 'cache-and-network',
		});

		const selectedDayAvailability =
			myDayAvailability.data?.myDailyAvailability.find(
				(availability) => day && isSameDay(availability.day, day)
			);

		return {
			date: day,
			timeRange: selectedDayAvailability?.availabilities.map((avail) => ({
				id: uuidv4(),
				baseId: avail.id,
				startTime: avail.startTime,
				endTime: avail.endTime,
			})),
		};
	};

	const handleDayClick = async (day: Date) => {
		if (
			(startDate &&
				endDate &&
				isWithinInterval(day, { start: startDate, end: endDate })) ||
			isSameDay(day, startDate)
		) {
			const isAlreadySelected = selectedDays.some((selectedDay) =>
				isSameDay(selectedDay.date, day)
			);

			if (isAlreadySelected) {
				setSelectedDays((prevSelectedDays) =>
					prevSelectedDays.filter(
						(selectedDay) => !isSameDay(selectedDay.date, day)
					)
				);
			} else {
				const newSelectedDay = await getNewSelectedDay(day);
				setSelectedDays((prevSelectedDays) => [
					...prevSelectedDays,
					newSelectedDay,
				]);
			}
		}
	};

	const handleAddTimeSlot = (dayDate: Date) => {
		const updatedSelectedDays = selectedDays.map((selectedDay) => {
			if (isSameDay(selectedDay.date, dayDate)) {
				const newTimeRange = {
					id: uuidv4(),
					startTime: '',
					endTime: '',
				};
				const updatedTimeRange = [
					...(selectedDay.timeRange || []),
					newTimeRange,
				];

				return {
					...selectedDay,
					timeRange: updatedTimeRange,
				};
			}
			return selectedDay;
		});

		setSelectedDays(updatedSelectedDays);
	};

	const handleRemoveSlots = async (dayDate: Date, timeRangeId: string) => {
		if (timeRangeId) {
			await deleteDayAvailability(timeRangeId);
		}

		const updatedSelectedDays = selectedDays.map((selectedDay) => {
			if (isSameDay(selectedDay.date, dayDate)) {
				const updatedTimeRange = selectedDay.timeRange?.filter(
					(timeRange) => timeRangeId !== timeRange.baseId
				);
				return {
					...selectedDay,
					timeRange: updatedTimeRange,
				};
			}
			return selectedDay;
		});
		setSelectedDays(updatedSelectedDays);
	};

	const sortedSelectedDays = selectedDays
		.slice()
		.sort((a, b) => a.date.getTime() - b.date.getTime());

	const { push } = useRouter();
	async function onSubmit() {
		try {
			const items = sortedSelectedDays.map((day) => ({
				day: formatDate(day.date),
				timeRange: day.timeRange
					? day.timeRange.map((timeRange) => ({
							dayAvailabilityId: timeRange.baseId || undefined,
							startTime: timeRange.startTime,
							endTime: timeRange.endTime,
					  }))
					: [],
			}));
			await createOrUpdateAvailability({
				input: {
					resourceId: resourceId,
					items: items,
				},
			});

			await push(paths.public.home);
		} catch (error) {
			if (isGraphqlMessageError(error)) {
				setErrorMessage(error.message);
			}
		}
	}

	const handleShowCheckbox = () => {
		setShowCalendarSelect(false);
		setShowCheckbox(true);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
			>
				<h2 className="mt-10 ml-32 text-2xl">Disponibilidad</h2>
				<p className="mt-5 ml-32">
					¿Hay algún día en el que tu recurso no esté disponible? Personalízalo.
				</p>
				<div className="flex flex-row w-full mt-5 ml-28">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={{ from: startDate, to: endDate }}
						numberOfMonths={2}
						onDayClick={handleDayClick}
					/>
					{sortedSelectedDays.length > 0 && (
						<div className="ml-8">
							<p>Fechas seleccionadas:</p>
							<ul className="mt-2">
								<FormField
									control={form.control}
									name="selectedDays"
									render={() => (
										<FormItem>
											{sortedSelectedDays.map((day) => (
												<FormItem key={day?.date?.getTime()}>
													<li
														className="mt-2 flex items-center"
														key={day?.date?.getTime()}
													>
														<div className="flex flex-row">
															<div className="flex flex-col">
																<p>{day?.date?.toLocaleDateString()}</p>
																{day.timeRange?.map((timeRange) => (
																	<div
																		key={timeRange.id}
																		className="flex items-center space-x-2 mt-2"
																	>
																		<FormItem>
																			<FormControl>
																				<Input
																					type="time"
																					defaultValue={timeRange.startTime}
																					onChange={(e) => {
																						if (timeRange.baseId) {
																							handleInputChange(
																								day.date,
																								timeRange.baseId,
																								'startTime',
																								e.target.value
																							);
																						} else {
																							handleNewTime(
																								day.date,
																								timeRange.id,
																								'startTime',
																								e.target.value
																							);
																						}
																					}}
																				/>
																			</FormControl>
																		</FormItem>
																		<p className="mx-2"> - </p>
																		<FormItem>
																			<FormControl>
																				<Input
																					type="time"
																					defaultValue={timeRange.endTime}
																					onChange={(e) => {
																						if (timeRange.baseId) {
																							handleInputChange(
																								day.date,
																								timeRange.baseId,
																								'endTime',
																								e.target.value
																							);
																						} else {
																							handleNewTime(
																								day.date,
																								timeRange.id,
																								'endTime',
																								e.target.value
																							);
																						}
																					}}
																				/>
																			</FormControl>
																		</FormItem>
																		<X
																			onClick={() => {
																				if (timeRange.baseId) {
																					handleRemoveSlots(
																						day.date,
																						timeRange.baseId
																					);
																				} else {
																					handleRemoveEmptySlots(
																						day.date,
																						timeRange.id
																					);
																				}
																			}}
																		/>
																	</div>
																))}
															</div>
															<PlusCircle
																onClick={() => handleAddTimeSlot(day.date)}
															/>
														</div>
													</li>
												</FormItem>
											))}
										</FormItem>
									)}
								/>
							</ul>
						</div>
					)}
				</div>
				<div className="mt-10 mb-5 ml-32">
					<div className="flex justify-between items-center">
						<Button type="submit">Guardar</Button>
						{isEdition ? (
							<Button
								className="mr-32"
								type="button"
								variant={'outline'}
								onClick={handleShowCheckbox}
							>
								<ChevronRight /> Editar en lote
							</Button>
						) : null}
					</div>
					{errorMessage && <p className="mt-5 text-red-600">{errorMessage}</p>}
				</div>
			</form>
		</Form>
	);
};
