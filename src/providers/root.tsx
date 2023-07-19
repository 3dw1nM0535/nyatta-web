"use client";

import { ReactNode } from "react";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import ApolloProvider from './apollo-client'
import { OnboardingProvider } from "./property-onboarding";
import { SearchListingProvider } from "./search-listings";

import { theme } from "@styles";
import SignInProvider from "providers/sign-in";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <SessionProvider refetchInterval={3600} refetchOnWindowFocus={true}>
        <ApolloProvider>
              <CacheProvider>
                <ChakraProvider theme={theme}>
                    <SearchListingProvider>
                      <OnboardingProvider>
                        <SignInProvider>{children}</SignInProvider>
                      </OnboardingProvider>
                    </SearchListingProvider>
                </ChakraProvider>
              </CacheProvider>
        </ApolloProvider>
      </SessionProvider>
    </>
  );

export default Providers;
