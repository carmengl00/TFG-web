import { MyReservedSlotsView } from '@/containers/Views/MyReservedSlots';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const MyReservedSlotsPage: NextPageWithLayout = () => <MyReservedSlotsView />;

MyReservedSlotsPage.getLayout = function getLayout(page: ReactElement) {
	return page;
};

export default MyReservedSlotsPage;
