"use client";

import { useQuery } from '@apollo/client';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

import NoListings from './components/NoListings';

import { GET_USER_PROPERTIES } from '@gql'; 

const Listings = () => {
  const { data: session, status } = useSession()
  const { data, loading } = useQuery(GET_USER_PROPERTIES, {
    variables: {
      email: session?.user?.email,
    },
    skip: status === 'unauthenticated' || status === 'loading',
  })

  return (
    <Flex>
      {loading && (
        <Flex w="100%" justifyContent="center">
          <Spinner boxSize="3em" color="green.800" thickness="10px" />
        </Flex>
      )}
      {!loading && data?.getUser?.properties?.length === 0 && <NoListings />}
      {!loading && data?.getUser?.properties?.length > 0 && <Box>listings</Box>}
    </Flex>
  )
}

export default Listings;
