"use client"

import { useMemo } from 'react'

import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'

import { GET_PROPERTY_TENANCY } from '@gql'
import Loader from 'components/loader'
import { useListings } from 'hooks'

const Tenancy: React.FC = () => {
  const { defaultListing } = useListings()
  const { data, loading: tenancyLoading } = useQuery(GET_PROPERTY_TENANCY, {
    variables: {
      propertyId: defaultListing?.value,
    },
    skip: !defaultListing,
  })
  const tenants = useMemo(() => (data?.getPropertyTenancy || []), [data])

  if (tenancyLoading) return <Loader />

  return (
    <Box>No Tenancy</Box>
  )
}

export default Tenancy
