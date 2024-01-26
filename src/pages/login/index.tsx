import { SignInView } from '@/containers/Views/public/SignIn';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const SignInPage: NextPageWithLayout = () => <SignInView />;

SignInPage.getLayout = function getLayout(page: ReactElement) {
	return page;
};

export default SignInPage;
