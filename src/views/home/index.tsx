"use client";

import React, { useEffect } from "react";

import { Button, Container, Heading, Flex, Image, Text, Stack, SimpleGrid } from "@chakra-ui/react";

import { trackPageView } from '@ga/analytics'

const ListingsView: React.FC = () => {

  useEffect(() => {
    trackPageView({ url: "/", title: "Home" })
  }, [])

  return (
    <Container h="100vh" maxW="5xl">
      <Stack
        textAlign="center"
        align="center"
        spacing={{base:8, md:10}}
        py={{base:20, md:28}}
      >
        <Heading
          fontWeight={600}
          fontSize={{base:"4xl", sm:"5xl", md:"7xl"}}
          lineHeight="110%"
          maxW="4xl"
        >
          <Text as="span" textDecoration="underline" color="green.800">Nyatta{' '}</Text>
          is a better way to manage your property.
        </Heading>
        <Text color="gray.500">
          Modern tools to onboard your property, streamline units and tenancy.<br />
          Unlock more value from your property.
        </Text>
        <Stack spacing="6" direction="row">
          <Button
            px="6"
            size="lg"
          >
            Get Started
          </Button>
        </Stack>
      </Stack>
      <SimpleGrid mb={10} columns={[1, 2]} spacing={10}>
        <Stack>
          <Heading>Modern property management software</Heading>
          <Text>Marketing headline</Text>
          <Stack>
            <Stack direction="row" align="center">
              <Flex>
                Icon
              </Flex>
              <Text fontWeight={600}>Feature description</Text>
            </Stack>
          </Stack>
        </Stack>
        <Flex>
          <Image
            src={"https://nyatta-media.s3.amazonaws.com/vacant_unfurnished_apartment_with_a_balcony_and_african_00656184-015b-4296-8063-d4957def7a7d.png"}
            alt="Vacant unfurnished apartment with a balcony and african"
            rounded={"md"}
            objectFit="cover"
          />
        </Flex>
      </SimpleGrid>
    </Container>
  )
};

export default ListingsView;
