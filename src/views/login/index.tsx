"use client";

import { AbsoluteCenter, Button, SimpleGrid,  Flex, Box, Icon, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaCheckDouble } from 'react-icons/fa'

const reasons = [
  "Setup you property",
  "Onboard your tenants",
  "Advertise vacant property/unit(s)",
]

const Login = (): JSX.Element => (
    <AbsoluteCenter w="100%">
      <SimpleGrid
        columns={[1, null, 2]}
      >
        <Flex
          h="100vh"
          bg="green.700"
          color="white"
          display={{base: "none", md: "flex"}}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text fontWeight="bold" fontSize="5xl">Get Started</Text>
          <Box>
          {reasons.map((item,index) => (
            <Text textAlign="left" key={index}>
            <Icon mx={4} as={FaCheckDouble} color="green.200" />
              {item}
          </Text>
          ))}
          </Box>
        </Flex>
        <Flex
          h="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Button size="lg" onClick={() => signIn('google')}>Sign In With Google</Button>
        </Flex>
      </SimpleGrid>
    </AbsoluteCenter>
  );

export default Login;
