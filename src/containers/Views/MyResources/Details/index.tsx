import Header from '@/components/Header';
import Menu from '@/components/Sidebar';
import { CalendarSelect } from '@/containers/Layout/CalendarSelect';
import { CheckboxReactHookFormMultiple } from '@/containers/Layout/CheckboxReactHookFormMultiple';
import ResourceFormDetail from '@/containers/Layout/ResourceFormDetail';
import { FormSchema } from '@/containers/Layout/ResourceFormDetail/constants';
import { useResource } from '@/graphql/hooks/myResources/useResource';
import { useResourceActions } from '@/graphql/hooks/myResources/useResourceActions';
import { isGraphqlMessageError } from '@/utils/isGraphqlMessageError';
import { addDays, format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { z } from 'zod';
import { useConnect } from '../connect';

export function MyResourcesDetailsView() {
	const { resources } = useConnect();

	const router = useRouter();
	const { id } = router.query;

	const [isEdition, setIsEdition] = useState<boolean>(false);
	useEffect(() => {
		if (id) {
			setIsEdition(true);
		}
	}, [id]);

	const { resource } = useResource({ id: id as string });

	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 15),
	});

	useEffect(() => {
		if (resource) {
			const newDateRange: DateRange = {
				from: new Date(resource.startDate),
				to: new Date(resource.endDate),
			};
			setDate(newDateRange);
		}
	}, [resource]);

	const { createResource, updateResource } = useResourceActions();

	const [showCheckbox, setShowCheckbox] = useState(false);
	const [showCalendarSelect, setShowCalendarSelect] = useState(false);

	const handleCheckboxButton = () => {
		setShowCheckbox(false);
		setShowCalendarSelect(true);
	};

	const [resourceId, setResourceId] = useState<string>('');

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		if (data.time_measurement === 'hours') {
			data.available_time = data.available_time * 60;
		}
		try {
			const startDateString = date?.from ? format(date.from, 'yyyy-MM-dd') : '';
			const endDateString = date?.to ? format(date.to, 'yyyy-MM-dd') : '';

			if (!isEdition) {
				const response = await createResource({
					name: data.name,
					description: data.description,
					location: data.location,
					availableTime: data.available_time,
					startDate: startDateString,
					endDate: endDateString,
				});
				if (response?.id) {
					setResourceId(response.id);
					setShowCheckbox(true);
				}
			} else {
				const response = await updateResource({
					resourceId: id as string,
					name: data.name,
					description: data.description,
					location: data.location,
					availableTime: data.available_time,
					startDate: startDateString,
					endDate: endDateString,
				});
				if (response?.id) {
					setResourceId(response.id);
					setShowCalendarSelect(true);
				}
			}
		} catch (e) {
			if (isGraphqlMessageError(e)) {
				setErrorMessage(e.message);
			}
		}
	};

	return (
		<>
			<div className="flex flex-row w-full h-full">
				{showCalendarSelect ? (
					<>
						<div className="w-[350px]">
							<Menu
								resourcesNumber={
									resources.pageInfo ? resources.pageInfo.totalResults || 0 : 0
								}
							/>
						</div>
						<div className="w-full">
							<Header
								title={isEdition ? 'Editar recurso' : 'Crear nuevo recurso'}
							/>
							{date?.from && date?.to && (
								<CalendarSelect
									resourceId={resourceId}
									isEdition={isEdition}
									date={{ from: date.from, to: date.to }}
									setShowCheckbox={setShowCheckbox}
									setShowCalendarSelect={setShowCalendarSelect}
								/>
							)}
						</div>
					</>
				) : !showCheckbox ? (
					<>
						<div className="w-[350px]">
							<Menu
								resourcesNumber={
									resources.pageInfo ? resources.pageInfo.totalResults || 0 : 0
								}
							/>
						</div>
						<div className="w-full">
							<Header
								title={isEdition ? 'Editar recurso' : 'Crear nuevo recurso'}
							/>
							<ResourceFormDetail
								date={date}
								resource={resource}
								errorMessage={errorMessage}
								onSubmit={onSubmit}
								setDate={setDate}
							/>
						</div>
					</>
				) : (
					<>
						<div className="w-[350px]">
							<Menu
								resourcesNumber={
									resources.pageInfo ? resources.pageInfo.totalResults || 0 : 0
								}
							/>
						</div>
						<div className="w-full">
							<Header
								title={isEdition ? 'Editar recurso' : 'Crear nuevo recurso'}
							/>
							{date?.from && date?.to && (
								<CheckboxReactHookFormMultiple
									isEdition={isEdition}
									resourceId={resourceId}
									startDate={date.from}
									endDate={date.to}
									onButtonClick={handleCheckboxButton}
								/>
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
}
