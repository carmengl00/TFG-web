import { paths } from '@/globals/paths';
import { generateRandomColor } from '@/utils/generateRandomColor';

interface CardResourceProps {
	resource: {
		id: string;
		name: string;
		description: string;
		availableTime: number;
		startDate: string;
		endDate: string;
		location?: string | undefined;
		user: {
			firstName: string;
			lastName: string;
		};
	};
	dateRange: string;
	availability: 'Disponible ahora' | 'No disponible';
	publicName: string;
	id: string;
}

export const CardResource = ({
	resource,
	dateRange,
	availability,
	publicName,
	id,
}: CardResourceProps) => {
	const cardColor = generateRandomColor();
	const reservationPath = paths.reservation
		.replace('[publicName]', publicName)
		.replace('[id]', id);

	return (
		<>
			<div
				key={resource.id}
				className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
				style={{ borderLeft: `5px solid ${cardColor}` }}
			>
				<a href={reservationPath}>
					<div className="px-4 py-12 w-72">
						<span className="text-gray-400 mr-3 uppercase text-xs">
							{availability}
						</span>
						<p className="text-lg font-bold text-black truncate block capitalize">
							{resource.name}
						</p>
						<div className="flex items-center">
							<p className="text-lg font-semibold text-black cursor-auto my-3">
								{dateRange}
							</p>
							<div className="ml-auto">
								<path
									fillRule="evenodd"
									d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
								/>
								<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
							</div>
						</div>
					</div>
				</a>
			</div>
		</>
	);
};
