"use client"

import { useMemo } from 'react'

import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'

import { GET_PROPERTY_UNITS } from '@gql'
import Loader from 'components/loader'
import { useListings } from 'hooks'

const Units: React.FC = () => {
  const { defaultListing } = useListings()
  const { data, loading: unitsLoading } = useQuery(GET_PROPERTY_UNITS, {
    variables: {
      propertyId: defaultListing?.value,
    },
    skip: !defaultListing,
  })
  const  units = useMemo(() => (data?.getPropertyUnits || []), [data])

  if (unitsLoading ) return <Loader />

  return (
    <Box>
      {units.length > 0 ? (
        <>
          {units.map((unit: any, index: number) => (
            <Box key={index}>{unit.name}</Box>
          ))}
        </>
      ) : (
        <Box>No units found</Box>
      )}
    </Box>
  )
}

export default Units
