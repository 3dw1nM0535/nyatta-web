"use client";

import { PropsWithChildren, useEffect } from 'react'

import { Center, Spinner } from '@chakra-ui/react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { PrivateRoutes } from '@constants'
import { Session } from '@types'

const ProtectedPage = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated' && PrivateRoutes.includes(pathname)) {
      router.push("/login/user");
    } else if (status === 'authenticated' && ((session as unknown) as Session)?.onboarding) {
      router.push("/onboarding/user");
    }
  }, [status, pathname, router, session])

  if (status === "loading") {
    return (
      <Center>
        <Spinner thickness="8px" color="green.700" size="xl" />
      </Center>
    );
  }

  return <>{children}</>
}

export default ProtectedPage;
