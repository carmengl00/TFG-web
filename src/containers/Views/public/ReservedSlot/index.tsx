import CalendarSelectSlot from '@/components/CalendarSelectSlot';
import HeaderReservation from '@/components/HeaderReservation';
import ResourceDetailsReservation from '@/components/ResourceDetailsReservation';
import { UserDoesntExist } from '@/components/UserDoesntExist';
import { useResource } from '@/graphql/hooks/myResources/useResource';
import { addDays } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

export function ReservedSlotView() {
	const router = useRouter();
	const { id } = router.query;

	const { resource, isResourceLoading } = useResource({ id: id });

	const defaultDate = {
		from: resource ? new Date(resource.startDate) : new Date(),
		to: resource ? new Date(resource.endDate) : addDays(new Date(), 15),
	};

	const title = `${resource?.user.firstName} ${resource?.user.lastName}`;
	const [showSelectHour, setShowSelectHour] = useState<boolean>(true);
	const [showForm, setShowForm] = useState<boolean>(false);

	return (
		<>
			{showSelectHour ? (
				<>
					{resource ? (
						<>
							<HeaderReservation title={title} />
							<ResourceDetailsReservation
								resource={resource}
								isResourceLoading={isResourceLoading}
								showForm={showForm}
							>
								<CalendarSelectSlot
									date={{ from: defaultDate?.from, to: defaultDate?.to }}
									resourceId={resource.id}
									setShowSelectHour={setShowSelectHour}
									setShowForm={setShowForm}
								/>
							</ResourceDetailsReservation>
						</>
					) : (
						<UserDoesntExist />
					)}
				</>
			) : (
				<>
					{resource ? (
						<>
							<HeaderReservation title={title} />
							<ResourceDetailsReservation
								resource={resource}
								isResourceLoading={isResourceLoading}
								showForm={showForm}
							/>
						</>
					) : (
						<UserDoesntExist />
					)}
				</>
			)}
		</>
	);
}
