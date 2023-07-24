import { Metadata } from "next";

import LandlordView from "views/landlord";

export const metadata: Metadata = {
  title: "Nyatta - Setup your property",
};

const Page = () => <LandlordView />;

// `/property/setup`
export default Page;
