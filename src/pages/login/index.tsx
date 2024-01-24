import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { SignInView } from "@/containers/Views/public/SignIn";

const SignInPage: NextPageWithLayout = () => <SignInView />;

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default SignInPage;