export const generateRandomColor = () => {
	const minValue = 100;
	const maxValue = 230;

	const generatedColors = new Set();

	let color: string;

	do {
		const r = Math.floor(minValue + Math.random() * (maxValue - minValue));
		const g = Math.floor(minValue + Math.random() * (maxValue - minValue));
		const b = Math.floor(minValue + Math.random() * (maxValue - minValue));

		color = `rgb(${r},${g},${b})`;
	} while (generatedColors.has(color));

	generatedColors.add(color);

	return color;
};
