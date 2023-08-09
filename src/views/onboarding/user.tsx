"use client";

import React from 'react'

import { Box, Center, Icon, VStack, Text } from "@chakra-ui/react";
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { FaCheckCircle } from 'react-icons/fa'

import { useSignIn } from "@hooks";
import { Session } from "@types";
import SignInForm from "form/sign-in";
import VerifySignInForm from "form/verify-signin";

const OnboardingView: React.FC = () => {
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
          <Center gap={4} flexDirection="column">
            <Icon boxSize="3em" as={FaCheckCircle} color="green.700" />
            <Text as={Link} color="green.800" href="/listings" textDecoration="underline">Proceed</Text>
          </Center>
        )}
      </Box>
    </VStack>
  );
};

export default OnboardingView;
