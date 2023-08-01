"use client"

import { useMemo } from 'react'

import { useQuery } from '@apollo/client'
import { Box, Badge, Center, Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react'
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
    <SimpleGrid columns={[1, null, 3]}>
      <Box w={{base: "full", md: 60}}>
        {units.length > 0 && units.map((unit: any, index: number) => (
          <Center key={index}>
            <Flex grow={1} direction="column" p={5} ml={{ md:10 }} borderWidth="1px">
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
                >
                  {unit.name}
                </Text>
                <Badge ml={2} colorScheme="green">{unit.state}</Badge>
                <Text ml={2}>{`Amenities(${unit.amenityCount})`}</Text>
              </Flex>
              <Text mt={2} fontSize="sm" fontWeight="bold">{unitType(unit.type)}</Text>
              <Text mt={2}>{`${new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(unit.price)}`}/month</Text>
            </Flex>
          </Center>
        ))}
        {units.length === 0 && (
          <Center>No Listings</Center>
        )}
      </Box>
    </SimpleGrid>
  )
}

export default Units
