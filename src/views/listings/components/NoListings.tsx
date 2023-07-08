import { Center, Text } from "@chakra-ui/react";
import Link from "next/link";

const NoListings = () => (
  <Center gap={4} textAlign="center" flexDirection="column">
    <Text fontSize="2xl">{`You've Not Setup any listings`}</Text>
    <Text as={Link} color="green.800" textDecoration="underline" href="/property/setup">Get Started</Text>
  </Center>
);

export default NoListings;
