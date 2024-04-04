import { useDayAvailabilityActions } from '@/graphql/hooks/myDayAvailability/useDayAvailabilityActions';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { FormSchema } from './constants';

export const useConnect = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
	const { createOrUpdateAvailability, deleteAllAvailabilities } =
		useDayAvailabilityActions();

	function handleAddTimeSlot(dayId: string) {
		const currentWeekdays = form.watch('weekdays');
		const updatedWeekdays = currentWeekdays.map((day) => {
			if (day.id === dayId) {
				return {
					...day,
					timeSlots: [...(day.timeSlots || []), ['', '']],
				};
			}
			return day;
		});
		form.setValue('weekdays', updatedWeekdays);
	}

	function handleRemoveTimeSlot(dayId: string, index: number) {
		const currentWeekdays = form.watch('weekdays');
		const updatedWeekdays = currentWeekdays.map((day) => {
			if (day.id === dayId) {
				const updatedTimeSlots = day.timeSlots.filter(
					(_, i: number) => i !== index
				);
				return {
					...day,
					timeSlots: updatedTimeSlots,
				};
			}
			return day;
		});
		form.setValue('weekdays', updatedWeekdays);
	}

	return {
		handleAddTimeSlot,
		handleRemoveTimeSlot,
		createOrUpdateAvailability,
		deleteAllAvailabilities,
	};
};
