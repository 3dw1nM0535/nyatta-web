"use client";

import { Box, Center, Icon, VStack, Text } from "@chakra-ui/react";
import { useSession } from 'next-auth/react'
import { FaCheckCircle } from 'react-icons/fa'

import { useSignIn } from "@hooks";
import { Session } from "@types";
import SignInForm from "form/sign-in";
import VerifySignInForm from "form/verify-signin";

const Onboarding = (): JSX.Element => {
  const { data: session } = useSession()
  const { status } = useSignIn();
  const onboarding = ((session as unknown) as Session)?.onboarding

  return (
    <VStack mt={10}>
      <Box>
        <Text mb={5} align="left" fontWeight="bold" fontSize="2xl">
          Verify your Identity
        </Text>
        {onboarding && status === "sign-in" && <SignInForm />}
        {onboarding && status === "pending" && <VerifySignInForm />}
        {!onboarding && (
          <Center>
            <Icon boxSize="3em" as={FaCheckCircle} color="green.700" />
          </Center>
        )}
      </Box>
    </VStack>
  );
};

export default Onboarding;
