"use client";

import React, { useEffect } from "react";

import { useQuery } from '@apollo/client';
import { Flex, Text } from '@chakra-ui/react';

import { trackPageView } from '@ga/analytics';
import { GET_PROPERTY } from '@gql';
import { useListings } from '@hooks';
import Loader from 'components/loader';

const ListingsView: React.FC = () => {
  const { defaultListing } = useListings()
  const { data, loading } = useQuery(GET_PROPERTY, {
    variables: {
      id: defaultListing,
    },
    skip: !defaultListing,
  })

  useEffect(() => {
    trackPageView({ url: "/listings", title: "Listings" })
  }, [])

  if (loading) return <Loader />

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <Text>{data?.getProperty.name}</Text>
    </Flex>
  )
}

export default ListingsView;
