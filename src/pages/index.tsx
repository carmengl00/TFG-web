import { MyResourcesView } from '@/containers/Views/MyResources';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => <MyResourcesView />;

HomePage.getLayout = function getLayout(page: ReactElement) {
	return page;
};

export default HomePage;
