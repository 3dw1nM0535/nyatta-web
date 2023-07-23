"use client"

import { PropsWithChildren, useMemo, useState } from 'react'

import { useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

import { GET_USER_PROPERTIES, GET_PROPERTY } from '@gql'
import ListingsContext from 'contexts/listings'

const ListingsProvider = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession()
  const { data } = useQuery(GET_USER_PROPERTIES, {
    variables: {
      email: session?.user?.email,
    },
    skip: status === 'unauthenticated' || status === 'loading',
  })
  const initialListing = useMemo(() => data?.getUser.properties[0]?.id, [data])
  const listings = useMemo(() => data?.getUser.properties, [data])
  const [defaultListing, setDefaultListing] = useState<string | undefined>(initialListing)
  const hasListings = useMemo(() => data?.getUser.properties.length > 0, [data])
  const { data: property } = useQuery(GET_PROPERTY, {
    variables: {
      id: defaultListing,
    },
    skip: status === "unauthenticated" || status === "loading" || !defaultListing,
  })
  console.log(defaultListing)

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
