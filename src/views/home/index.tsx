"use client";

import React, { useEffect } from "react";

import { Button, Container, Heading, Text, Stack } from "@chakra-ui/react";
import Link from 'next/link'

import { trackPageView } from '@ga/analytics'

const ListingsView: React.FC = () => {

  useEffect(() => {
    trackPageView({ url: "/", title: "Home" })
  }, [])

  return (
    <Container maxW="5xl">
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
          is a better way to manage your property
        </Heading>
        <Text color="gray.500">
          Modern tools to onboard your property, streamline units and tenancy.<br />
          Unlock more value from your property.
        </Text>
        <Stack spacing="6" direction="row">
          <Button
            px="6"
            size="lg"
            as={Link}
            href="/listings/setup"
          >
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
};

export default ListingsView;
