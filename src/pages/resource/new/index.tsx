import { MyResourcesDetailsView } from '@/containers/Views/MyResources/Details';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

const NewResourcePage: NextPageWithLayout = () => <MyResourcesDetailsView />;

NewResourcePage.getLayout = function getLayout(page: ReactElement) {
	return page;
};

export default NewResourcePage;
