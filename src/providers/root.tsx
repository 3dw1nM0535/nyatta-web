"use client";

import { ReactNode } from "react";

import {
  ApolloProvider,
  type ApolloClient,
  type NormalizedCacheObject,
} from "@apollo/client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import { createClient } from "../apollo/createClient";

import { OnboardingProvider } from "./property-onboarding";
import { SearchListingProvider } from "./search-listings";

import { theme } from "@styles";
import SignInProvider from "providers/sign-in";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  const jwt = getCookie("jwt");
  const client = createClient(jwt);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <ApolloProvider client={client as ApolloClient<NormalizedCacheObject>}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <SessionProvider refetchInterval={3600} refetchOnWindowFocus={true}>
              <SearchListingProvider>
                <OnboardingProvider>
                  <SignInProvider>{children}</SignInProvider>
                </OnboardingProvider>
              </SearchListingProvider>
            </SessionProvider>
          </ChakraProvider>
        </CacheProvider>
      </ApolloProvider>
    </>
  );
};

export default Providers;
