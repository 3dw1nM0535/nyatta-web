import { Metadata } from 'next'

import OnboardingView from "views/onboarding/user";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Fill out your details to get started",
}

const Page = () => <OnboardingView />;

// `/onboarding/user`
export default Page;
