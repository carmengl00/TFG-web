import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { SignUpView } from "@/containers/Views/public/SignUp";

const SignUpPage: NextPageWithLayout = () => <SignUpView />;

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default SignUpPage;