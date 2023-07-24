import { Metadata } from 'next'

import Listings from "views/home";

export const metadata: Metadata = {
  title: "Nyatta - Unlock your real estate property management",
}

const Page = () => <Listings />;

// `/`
export default Page;
