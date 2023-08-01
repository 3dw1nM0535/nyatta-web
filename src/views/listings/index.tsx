"use client";

import React, { useEffect } from "react";

import { useQuery } from '@apollo/client';
import { Box, Flex, Text } from '@chakra-ui/react';
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
      justifyContent="space-between"
      align="center"
    >
      <Box
        p={4}
        shadow="md"
        border="1px solid"
        borderRadius="md"
        w="full"
        textAlign="center"
      >
        <Text color="green.800" fontWeight="bold" fontSize="xl">Total Units</Text>
        <Text>{data?.listingOverview.totalUnits}</Text>
      </Box>
      <Box
        p={4}
        shadow="md"
        border="1px solid"
        borderRadius="md"
        textAlign="center"
        w="full"
      >
        <Text color="green.800" fontWeight="bold" fontSize="xl">Occupied</Text>
        <Text>{data?.listingOverview.occupiedUnits}</Text>
      </Box> 
      <Box
        p={4}
        shadow="md"
        border="1px solid"
        borderRadius="md"
        w="full"
        textAlign="center"
      >
        <Text color="green.800" fontWeight="bold" fontSize="xl">Vacant</Text>
        <Text>{data?.listingOverview.vacantUnits}</Text>
      </Box>
    </Flex>
  )
}

export default ListingsView;
