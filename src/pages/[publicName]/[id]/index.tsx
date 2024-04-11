import { ReservedSlotView } from '@/containers/Views/public/ReservedSlot';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

const ReservedSlotPage: NextPageWithLayout = () => <ReservedSlotView />;

ReservedSlotPage.getLayout = function getLayout(page: ReactElement) {
	return page;
};

export default ReservedSlotPage;
