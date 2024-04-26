import Header from '@/components/Header';
import ReservationCard from '@/components/ReservationCard';
import Menu from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { SkipForward } from 'lucide-react';
import { useConnect } from './connect';

export function MyReservedSlotsView() {
	const { resources, reservedSlots, loadMoreReservedSlots } = useConnect();

	return (
		<>
			<div className="flex flex-row w-full h-full">
				<div className="w-3/12">
					<Menu
						resourcesNumber={
							resources.pageInfo ? resources.pageInfo.totalResults || 0 : 0
						}
						reservedSlotsNumber={
							reservedSlots.pageInfo
								? reservedSlots.pageInfo.totalResults || 0
								: 0
						}
					/>
				</div>
				<div className="w-full">
					<Header title="Próximos eventos" />
					{reservedSlots.edges.map((reservedSlot) => (
						<ReservationCard
							key={reservedSlot.id}
							id={reservedSlot.id}
							name={reservedSlot.name}
							email={reservedSlot.email}
							resourceName={reservedSlot.resource.name}
							startTime={reservedSlot.startTime}
							endTime={reservedSlot.endTime}
						/>
					))}
					<Button onClick={loadMoreReservedSlots} className="ml-5 mt-5">
						<SkipForward />
					</Button>
				</div>
			</div>
		</>
	);
}
