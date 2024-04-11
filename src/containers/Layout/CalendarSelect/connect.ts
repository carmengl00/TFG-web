import { isSameDay } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

export const useConnect = (
	setSelectedDays: Dispatch<SetStateAction<SelectedDay[]>>,
	selectedDays: SelectedDay[]
) => {
	const handleNewTime = (
		dayDate: Date,
		id: string,
		field: 'startTime' | 'endTime',
		value: string
	) => {
		setSelectedDays((prevSelectedDays) => {
			return prevSelectedDays.map((selectedDay) => {
				if (isSameDay(selectedDay.date, dayDate)) {
					const updatedTimeRange = selectedDay.timeRange
						? selectedDay.timeRange.map((timeRange) => {
								if (timeRange.id === id) {
									return { ...timeRange, [field]: value };
								}
								return timeRange;
						  })
						: [];
					return {
						...selectedDay,
						timeRange: updatedTimeRange,
					};
				}
				return selectedDay;
			});
		});
	};

	const handleRemoveEmptySlots = async (dayDate: Date, timeRangeId: string) => {
		const updatedSelectedDays = selectedDays.map((selectedDay) => {
			if (isSameDay(selectedDay.date, dayDate)) {
				const updatedTimeRange = selectedDay.timeRange?.filter(
					(timeRange) => timeRangeId !== timeRange.id
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

	const handleInputChange = (
		date: Date,
		baseId: string,
		field: 'startTime' | 'endTime',
		value: string
	) => {
		setSelectedDays((prevSelectedDays) => {
			const updatedSelectedDays = prevSelectedDays.map((selectedDay) => {
				if (isSameDay(selectedDay.date, date)) {
					const updatedTimeRange = selectedDay.timeRange?.map((timeRange) => {
						if (timeRange.baseId === baseId) {
							return {
								...timeRange,
								[field]: value,
							};
						}
						return timeRange;
					});
					return {
						...selectedDay,
						timeRange: updatedTimeRange,
					};
				}
				return selectedDay;
			});
			return updatedSelectedDays;
		});
	};

	return {
		handleNewTime,
		handleRemoveEmptySlots,
		handleInputChange,
	};
};
