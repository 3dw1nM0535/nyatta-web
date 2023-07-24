import { Metadata } from 'next'

import OnboardingView from "views/onboarding/user";

export const metadata: Metadata = {
  title: "Nyatta - Login to get started",
}

const Page = () => <OnboardingView />;

// `/onboarding/user`
export default Page;
