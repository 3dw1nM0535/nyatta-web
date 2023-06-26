"use client";

import { ReactNode } from "react";

import { Center, Spinner } from "@chakra-ui/react";
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";

import { PrivateRoutes } from "@constants";
import { Session } from "@types";

interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession();

  // wait for auth
  if (status === "loading") {
    return (
      <Center>
        <Spinner thickness="8px" color="green.700" size="xl" />
      </Center>
    );
  } else if (status === 'authenticated' && ((session as unknown) as Session).onboarding === 'true') {
    router.push('/onboarding/user')
  } else if (!session && PrivateRoutes.includes(pathname)) {
    router.push('/login/user')
  }

  return <>{children}</>;
};

export default AppProvider;
