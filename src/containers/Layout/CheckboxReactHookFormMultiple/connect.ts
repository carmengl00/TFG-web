import { useDayAvailabilityActions } from '@/graphql/hooks/myDayAvailability/useDayAvailabilityActions';
import { useState } from 'react';

export const useConnect = () => {
	const [timeSlots, setTimeSlots] = useState<{ [key: string]: string[][] }>({});

	const { createDayAvailability } = useDayAvailabilityActions();

	function handleAddTimeSlot(day: string) {
		setTimeSlots((prevTimeSlots) => ({
			...prevTimeSlots,
			[day]: [...(prevTimeSlots[day] || []), ['', '']],
		}));
	}

	function handleRemoveTimeSlot(day: string, index: number) {
		setTimeSlots((prevTimeSlots) => ({
			...prevTimeSlots,
			[day]: prevTimeSlots[day].filter((_, i) => i !== index),
		}));
	}

	return {
		timeSlots,
		setTimeSlots,
		handleAddTimeSlot,
		handleRemoveTimeSlot,
		createDayAvailability,
	};
};
