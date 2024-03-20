type SelectedDay = {
	date: Date;
	timeRange?: {
		id: string;
		baseId?: string;
		startTime: string;
		endTime: string;
	}[];
};
