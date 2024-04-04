import { paths } from '@/globals/paths';
import { useResourceActions } from '@/graphql/hooks/myResources/useResourceActions';
import {
	CalendarDays,
	ChevronDownIcon,
	CircleIcon,
	Settings2,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface CustomCardProps {
	id: string;
	title: string;
	startDate: Date;
	endDate: Date;
	availableTime: number;
}

const CustomCard = ({
	id,
	title,
	startDate,
	endDate,
	availableTime,
}: CustomCardProps) => {
	const currentDate = new Date();
	const formattedStartDate = `${startDate.getDate()} de ${startDate.toLocaleDateString(
		'es-ES',
		{ month: 'long' }
	)} de ${startDate.getFullYear()}`;
	const formattedEndDate = `${endDate.getDate()} de ${endDate.toLocaleDateString(
		'es-ES',
		{ month: 'long' }
	)} de ${endDate.getFullYear()}`;

	const { push, query } = useRouter();
	const { deleteResource } = useResourceActions();

	return (
		<div className="mt-10">
			<Card className="w-11/12 ml-5">
				<CardHeader className="grid grid-cols-[auto,1fr_110px] items-start gap-4 space-y-0">
					<div className="flex items-center">
						<CircleIcon
							className={`mr-1 ${
								currentDate >= startDate && currentDate <= endDate
									? 'fill-green-500 text-green-500'
									: 'fill-red-500 text-red-500'
							}`}
						/>
					</div>
					<div className="space-y-1">
						<CardTitle>{title}</CardTitle>
						<CardDescription>
							Disponibilidad: {formattedStartDate} - {formattedEndDate}
						</CardDescription>
					</div>
					<div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
						<Button variant="secondary" className="px-1 shadow-none">
							<Settings2 className="mr-2 h-4 w-4" />
							Settings
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="secondary" className="px-2 shadow-none">
									<ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								alignOffset={-5}
								className="w-[200px]"
								forceMount
							>
								<DropdownMenuItem
									onClick={() =>
										push({
											pathname: paths.editResource,
											query: { ...query, id: id },
										})
									}
								>
									Editar
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => deleteResource(id)}>
									Eliminar
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex space-x-4 text-sm text-muted-foreground">
						<div className="flex items-center">
							<CalendarDays className="mr-1 h-3 w-3" />
							Tiempo disponible por reserva: {'   '}
							{availableTime >= 60
								? `${availableTime / 60} hora${availableTime >= 120 ? 's' : ''}`
								: `${availableTime} minutos`}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default CustomCard;
