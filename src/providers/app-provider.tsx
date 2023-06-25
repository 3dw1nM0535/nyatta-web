"use client";

import { ReactNode } from "react";

import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";

import { Session } from "@types";

interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  const router = useRouter()
  const { data: session, status } = useSession();

  // wait for auth
  if (status === "loading") {
    return (
      <Center>
        <Spinner thickness="8px" color="green.700" size="xl" />
      </Center>
    );
  } else if (status === 'authenticated' && ((session as unknown) as Session).onboarding === 'true') {
    router.push('/login/user')
  }
  return <>{children}</>;
};

export default AppProvider;
