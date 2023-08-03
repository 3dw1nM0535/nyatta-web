"use client"

import { Box, Badge, Center, Flex, Icon, Text } from '@chakra-ui/react'
import { MdImageNotSupported } from 'react-icons/md'

const unitType = (type: string) => type.length === 1 ? `${type} bedroom` : type

interface Props {
  // TODO type props
  unit: any
}

const Units = ({ unit }: Props) => (
    <Box borderRadius="lg" p="5" borderWidth="1px">
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
  )

export default Units
