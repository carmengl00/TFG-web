import { useSlotsActions } from '@/graphql/hooks/slots/useSlotsActions';
import { showFormatedTimes } from '@/utils/showFormattedTimes';
import { CalendarDays, CircleIcon, Trash2Icon } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';

interface ReservationCardProps {
	resourceName: string;
	id: string;
	name: string;
	email: string;
	startTime: string;
	endTime: string;
}

const ReservationCard = ({
	resourceName,
	id,
	name,
	email,
	startTime,
	endTime,
}: ReservationCardProps) => {
	const currentDate = new Date();
	const startDate = new Date(startTime);

	const { deleteReservedSlot } = useSlotsActions();
	return (
		<div className="mt-10">
			<Card className="w-11/12 ml-5">
				<CardHeader className="grid grid-cols-[auto,1fr_110px] items-start gap-4 space-y-0">
					<div className="flex items-center">
						<CircleIcon
							className={`mr-1 ${
								currentDate <= startDate
									? 'fill-green-500 text-green-500'
									: 'fill-red-500 text-red-500'
							}`}
						/>
					</div>
					<div className="space-y-1">
						<CardTitle>{resourceName}</CardTitle>
						<CardDescription>
							Asistente: {name} - {email}
						</CardDescription>
					</div>
					<div className="flex items-center space-x-1 text-secondary-foreground">
						<Trash2Icon onClick={() => deleteReservedSlot(id)} />
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex space-x-4 text-sm text-muted-foreground">
						<div className="flex items-center">
							<CalendarDays className="mr-1 h-3 w-3" />
							{showFormatedTimes(startTime, endTime)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ReservationCard;
