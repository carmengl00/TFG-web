import { useSlots } from '@/graphql/hooks/slots/useSlots';
import '@/styles/styles.css';
import { format, isSameDay, isWithinInterval } from 'date-fns';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';

interface CalendarSelectSlotProps {
	date: {
		from: Date;
		to: Date;
	};
	resourceId: string;
}

const CalendarSelectSlot = ({ date, resourceId }: CalendarSelectSlotProps) => {
	const { getSlots } = useSlots();
	const startDate = date.from;
	const endDate = date.to;
	const [selectedDay, setSelectedDay] = useState<SelectedDaySlot>();

	const getPossibleSlots = async (day: Date): Promise<SelectedDaySlot> => {
		const formattedDay = format(day, 'yyyy-MM-dd');
		const slots = await getSlots({
			variables: {
				input: {
					day: formattedDay,
					resourceId: resourceId,
				},
			},
			fetchPolicy: 'cache-and-network',
		});
		if (!slots.data || !slots.data.getSlots) {
			return {
				day: day,
				slot: [],
			};
		}
		const formattedSlots = slots.data.getSlots.map((slot) => ({
			startTime: slot.startTime,
			endTime: slot.endTime,
			reserved: slot.reserved,
		}));

		return {
			day: day,
			slot: formattedSlots,
		};
	};

	const handleDayClick = async (day: Date) => {
		if (
			(startDate &&
				endDate &&
				isWithinInterval(day, { start: startDate, end: endDate })) ||
			isSameDay(day, startDate)
		) {
			const newSelectedDay = await getPossibleSlots(day);
			setSelectedDay(newSelectedDay);
			setSelectedSlot(null);
		}
	};
	const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

	const handleSlotClick = (index: number) => {
		setSelectedSlot(index === selectedSlot ? null : index);
	};

	return (
		<div className="flex flex-col w-full items-center justify-center">
			<div className="flex flex-col w-5/6 h-5/6 bg-white border border-gray-200 rounded-lg items-center">
				Selecciona fecha y hora
				<div className="flex flex-row mt-10">
					<div>
						<Calendar
							mode="range"
							selected={{ from: startDate, to: endDate }}
							className="rounded-md border"
							onDayClick={handleDayClick}
						/>
					</div>
					{selectedDay && (
						<div className="ml-16">
							<div key={selectedDay.day.toISOString()}>
								<div>
									{selectedDay.day.toLocaleDateString('es-ES', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</div>
								<div
									className="flex flex-col"
									style={{
										overflowY: 'auto',
										maxHeight: '285px',
										marginRight: '10px',
									}}
								>
									{' '}
									{selectedDay.slot.map((slot, slotIndex) => (
										<Button
											key={slot.startTime}
											className={`button ${
												slot.reserved ? 'reserved-background' : null
											}`}
											variant={slotIndex === selectedSlot ? 'default' : 'ghost'}
											size="default"
											onClick={() => handleSlotClick(slotIndex)}
											style={{
												marginBottom: '5px',
												border: '1px solid black',
											}}
											disabled={slot.reserved}
										>
											{slot.startTime.slice(0, -3)} -{' '}
											{slot.endTime.slice(0, -3)}
										</Button>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
				<Button className="mt-10" type="submit">
					Guardar
				</Button>
			</div>
		</div>
	);
};

export default CalendarSelectSlot;
