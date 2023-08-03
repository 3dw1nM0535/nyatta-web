"use client"

import { PropsWithChildren, useMemo, useState } from 'react'

import { useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

import { GET_USER_PROPERTIES } from '@gql'
import ListingsContext from 'contexts/listings'
import type { ListingOption } from 'types'

const ListingsProvider = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession()
  const skipRequest = status === 'unauthenticated' || status === 'loading'
  const { data } = useQuery(GET_USER_PROPERTIES, {
    variables: {
      email: session?.user?.email,
    },
    skip: skipRequest,
  })
  const listings = useMemo(() => (data?.getUserProperties || []), [data])
  const [defaultListing, setDefaultListing] = useState<ListingOption>()
  const hasListings = useMemo(() => data?.getUserProperties.length > 0, [data])

  return (
    <ListingsContext.Provider
      value={{
        defaultListing,
        setDefaultListing,
        listings,
        hasListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  )
}

export default ListingsProvider
