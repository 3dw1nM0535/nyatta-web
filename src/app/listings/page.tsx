import { Metadata } from "next";

import ListingsView from "views/listings";

export const metadata: Metadata = {
  title: "Nyatta - Unlock your real estate property management",
};

const Page = () => <ListingsView />;

// `/listings`
export default Page;
