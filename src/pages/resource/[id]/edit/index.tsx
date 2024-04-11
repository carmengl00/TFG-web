import { MyResourcesDetailsView } from '@/containers/Views/MyResources/Details';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

const EditResourcePage: NextPageWithLayout = () => <MyResourcesDetailsView />;

EditResourcePage.getLayout = function getLayout(page: ReactElement) {
	return page;
};

export default EditResourcePage;
