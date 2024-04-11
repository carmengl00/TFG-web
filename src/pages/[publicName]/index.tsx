import { ResourceReservationView } from '@/containers/Views/public/ResourceReservation';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

const ResourceReservationPage: NextPageWithLayout = () => (
	<ResourceReservationView />
);

ResourceReservationPage.getLayout = function getLayout(page: ReactElement) {
	return page;
};

export default ResourceReservationPage;
