import { Metadata } from 'next'

import Listings from 'views/listings'

export const metadata: Metadata = {
  title: "Listing",
  description: "Property overview, units and tenancy"
}

const Page = () => (
  <Listings />
)

// /listings/*
export default Page
