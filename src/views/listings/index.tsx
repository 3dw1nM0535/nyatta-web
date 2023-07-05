"use client";

import { AbsoluteCenter, Box, Flex, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

import SearchForm from "form/search-listings";

const Listings = () => (
  <Flex flexDirection="column">
    <Box>
      <SearchForm />
    </Box>
    <AbsoluteCenter display="flex" justifyContent="center" w="100%">
      <VStack spacing={{base: 4, md: 6}}>
        <Box>
          <Text fontSize={{base: "3xl", md: "4xl"}}>No Listings Found</Text>
        </Box>
        <Box textAlign="center">
          <Text>
            We are now receiving <Text color="green.800" textDecoration="underline" as={Link} href="/property/setup">new</Text> listings!
          </Text>
        </Box>
        <Box>
<Text>
            Want to receive updates? Register <Text color="green.800" textDecoration="underline" as={Link} href="/mailing">here</Text>
          </Text>
        </Box>
      </VStack>
    </AbsoluteCenter>
  </Flex>
);

export default Listings;
