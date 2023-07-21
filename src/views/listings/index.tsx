"use client";

import React, { useEffect } from "react";

import { useQuery } from '@apollo/client';
import { Box, Center, Flex, Icon, Image, Spinner, SimpleGrid, Text, Tag } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { MdImageNotSupported } from 'react-icons/md';

import NoListings from './components/NoListings';

import { trackPageView } from '@ga/analytics';
import { GET_USER_PROPERTIES } from '@gql'; 

const ListingsView: React.FC = () => {
  const { data: session, status } = useSession()
  const { data, loading } = useQuery(GET_USER_PROPERTIES, {
    variables: {
      email: session?.user?.email,
    },
    skip: status === 'unauthenticated' || status === 'loading',
  })
  const properties = data?.getUser.getProperties || []

  useEffect(() => {
    trackPageView({ url: "/listings", title: "Listings" })
  }, [])

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justifyContent="center"
    >
      {loading && (
        <Flex w="100%" justifyContent="center">
          <Spinner boxSize="3em" color="green.800" thickness="10px" />
        </Flex>
      )}
      {!loading && properties.length === 0 && <NoListings />}
      <SimpleGrid mb={20} spacing={4} columns={[1, null, 4]}>
      {!loading && properties.length > 0 && properties.map((item: any) => (
        <Box
          _hover={{
            cursor: "pointer",
          }}
          p={2}
          key={item.id}
        >
          <Box h="150px">
            {item.thumbnail? (
              <Image
                borderRadius="md"
                src={`${item.thumbnail}`}
                alt="property"
                h="100%"
                w="100%"
              />
            ): (
              <Center flexDirection="column" w="100%">
                <Icon as={MdImageNotSupported} boxSize="10em" color="gray.200" />
              </Center>
            )}
          </Box>
          <Flex align="baseline" mt={2}>
            <Tag colorScheme="green">{item.status}</Tag>
          </Flex>
          <Text mt={2} fontSize="xl">{item.name}</Text>
          <Text color="gray.500" mt={2}>{item.town}</Text>
        </Box>
      ))}
      </SimpleGrid>
    </Flex>
  )
}

export default ListingsView;
