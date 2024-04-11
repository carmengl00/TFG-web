type SelectedDaySlot = {
	day: Date;
	slot: {
		startTime: string;
		endTime: string;
		reserved: boolean;
	}[];
};
