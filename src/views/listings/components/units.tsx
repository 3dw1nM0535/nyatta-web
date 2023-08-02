"use client"

import { useMemo } from 'react'

import { useQuery } from '@apollo/client'
import { Box, Badge, Center, Flex, Icon, Text } from '@chakra-ui/react'
import { MdImageNotSupported } from 'react-icons/md'

import { GET_PROPERTY_UNITS } from '@gql'
import Loader from 'components/loader'
import { useListings } from 'hooks'

const unitType = (type: string) => type.length === 1 ? `${type} bedroom` : type

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
      {units.length > 0 && units.map((unit: any, index: number) => (
        <Center key={index}>
          <Box p="5" w="320px" borderWidth="1px">
            <Center>
              <Icon
                as={MdImageNotSupported}
                boxSize="10em"
                color="gray.200"
              />
            </Center>
            <Flex align="baseline">
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="sm"
                noOfLines={[1,2,3]}
              >
                {unit.name}
              </Text>
              <Badge ml={2} colorScheme="green">{unit.state}</Badge>
              <Text noOfLines={[1,2,3]} ml={2}>{`Amenities(${unit.amenityCount})`}</Text>
            </Flex>
            <Text mt={2} fontSize="sm" fontWeight="bold">{unitType(unit.type)}</Text>
            <Text mt={2}>{`${new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(unit.price)}`}/month</Text>
          </Box>
        </Center>
      ))}
      {units.length === 0 && (
        <Flex justifyContent={{base: "center", md: "flex-start"}}>No Listings</Flex>
      )}
    </Box>
  )
}

export default Units
