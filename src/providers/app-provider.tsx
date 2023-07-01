"use client";

import { ReactNode, useEffect } from "react";

import { useQuery } from '@apollo/client';
import { Center, Spinner } from "@chakra-ui/react";
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";

import { PrivateRoutes } from "@constants";
import { GET_USER } from "@gql";
import { Session } from "@types";
import { AppContext } from 'contexts/app-context'

interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const { data, loading: userLoading } = useQuery(GET_USER, {
    variables: { email: session?.user?.email },
    skip: status === 'unauthenticated' || status === 'loading',
  });
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (session && ((session as unknown) as Session).onboarding === 'true') {
      router.push('/onboarding/user')
    } else if (!session && PrivateRoutes.includes(pathname)) {
      router.push('/login/user')
    }
  }, [status, pathname, session])

  // wait for auth
  if (status === "loading" || userLoading) {
    return (
      <Center>
        <Spinner thickness="8px" color="green.700" size="xl" />
      </Center>
    );
  }

  return (
    <AppContext.Provider
      value={{
        phone: data?.getUser?.phone,
      }}
    >
      {children}
    </AppContext.Provider>
  )
};

export default AppProvider;
