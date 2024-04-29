import { ProfileView } from '@/containers/Views/Profile';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

const ProfilePage: NextPageWithLayout = () => <ProfileView />;

ProfilePage.getLayout = function getLayout(page: ReactElement) {
	return page;
};

export default ProfilePage;
