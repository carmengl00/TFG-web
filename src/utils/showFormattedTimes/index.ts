export const showFormatedTimes = (
	startTimeString: string,
	endTimeString: string
) => {
	const startDate = new Date(startTimeString);
	const endDate = new Date(endTimeString);

	const weekdays = [
		'Domingo',
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado',
	];
	const months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];

	const startDay = startDate.getDate();
	const startMonth = startDate.getMonth();
	const startYear = startDate.getFullYear();

	const dayOfWeek = weekdays[startDate.getDay()];
	const month = months[startMonth];

	const startTime = startDate.toLocaleTimeString('es-ES', {
		hour: '2-digit',
		minute: '2-digit',
	});
	const endTime = endDate.toLocaleTimeString('es-ES', {
		hour: '2-digit',
		minute: '2-digit',
	});

	return `${dayOfWeek}, ${startDay} de ${month} de ${startYear}, ${startTime} - ${endTime}`;
};
