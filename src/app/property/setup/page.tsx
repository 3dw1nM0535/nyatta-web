import { Metadata } from "next";

import LandlordView from "views/landlord";

export const metadata: Metadata = {
  title: "Property",
  description: "Onboard your property",
};

const Page = () => <LandlordView />;

// `/property/setup`
export default Page;
