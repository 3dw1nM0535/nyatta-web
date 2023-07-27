"use client";

import React, { useEffect } from "react";

import { useQuery } from '@apollo/client';
import { Flex, Text } from '@chakra-ui/react';
import { usePathname } from 'next/navigation'

import Units from './components/units'

import { trackPageView } from '@ga/analytics';
import { GET_LISTING_OVERVIEW } from '@gql';
import { useListings } from '@hooks';
import Loader from 'components/loader';

const ListingsView: React.FC = () => {
  const pathname = usePathname()
  const { defaultListing } = useListings()
  const { data, loading } = useQuery(GET_LISTING_OVERVIEW, {
    variables: {
      propertyId: defaultListing?.value,
    },
    skip: !defaultListing,
  })

  useEffect(() => {
    trackPageView({ url: "/listings", title: "Listings" })
  }, [])

  if (loading) return <Loader />

  return pathname === "/listings/units" ? (
    <Units />
  ) : (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      gap={4}
    >
      <Text>{data?.listingOverview.totalUnits}</Text>
      <Text>{data?.listingOverview.occupiedUnits}</Text>
      <Text>{data?.listingOverview.vacantUnits}</Text>
    </Flex>
  )
}

export default ListingsView;
