"use client";

import { ReactNode } from 'react'

import { Center, Spinner } from '@chakra-ui/react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { PrivateRoutes } from '@constants'
import { Session } from '@types'

interface Props {
  children: ReactNode
}

const ProtectedPage = ({ children }: Props) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const isAuthenticated = status === 'authenticated'

  if (PrivateRoutes.includes(pathname)) {
    if (status === "loading") {
      return (
        <Center>
          <Spinner thickness="8px" color="green.700" size="xl" />
        </Center>
      );
    }

    if (!isAuthenticated) {
      router.push('/login/user')
    } else if (isAuthenticated && ((session as unknown) as Session).onboarding === 'true') {
      router.push('/onboarding/user')
    }
  }

  return <>{children}</>
}

export default ProtectedPage;
