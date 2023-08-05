"use client";

import React, { useEffect, useMemo } from "react";

import { useQuery } from '@apollo/client';
import { Box, Button, Center, Flex, Icon, Modal, ModalContent, ModalOverlay, ModalBody, ModalFooter, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { usePathname } from 'next/navigation'
import { BsHouseAdd } from 'react-icons/bs'

import Units from './components/units'

import { trackPageView } from '@ga/analytics';
import { GET_LISTING_OVERVIEW, GET_PROPERTY_UNITS } from '@gql';
import { useListings } from '@hooks';
import Loader from 'components/loader';
import LandlordView from 'views/landlord'

const ListingsView: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const pathname = usePathname()
  const { defaultListing } = useListings()
  const { data, loading: loadingListingOverview } = useQuery(GET_LISTING_OVERVIEW, {
    variables: {
      propertyId: defaultListing?.value,
    },
    skip: !defaultListing,
  })
  const { data: unitsData, loading: unitsLoading } = useQuery(GET_PROPERTY_UNITS, {
    variables: {
      propertyId: defaultListing?.value,
    },
    skip: !defaultListing,
  })

  useEffect(() => {
    trackPageView({ url: "/listings", title: "Listings" })
  }, [])

  const units = useMemo(() => (unitsData?.getPropertyUnits || []), [unitsData])

  if (loadingListingOverview || unitsLoading) return <Loader />

  return pathname === "/listings/units" ? (
    <SimpleGrid columns={{sm: 1, md: 2, lg: 3}} spacing="20px">
      <Modal motionPreset="slideInBottom" isCentered size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          backdropFilter="auto"
          bg="none"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalBody>
            Add unit
          </ModalBody>
          <ModalFooter>
            <Button size="sm">Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {units.length > 0 && units.map((unit: any) => (
        <Units key={unit.id} unit={unit} />
      ))}
      {units.length === 0 && (
        <Text>No units</Text>
      )}
      <Center p={10} bg="gray.100">
        <Icon
          boxSize={10}
          _hover={{
            cursor: "pointer",
          }}
          onClick={onOpen}
          as={BsHouseAdd}
        />
      </Center>
    </SimpleGrid>
  ) : pathname === "/listings/setup" ? (
    <LandlordView />
  ) : (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      gap={4}
      justifyContent="space-between"
      align="center"
    >
      <Box
        p={4}
        shadow="md"
        border="1px solid"
        borderRadius="md"
        w="full"
        textAlign="center"
      >
        <Text color="green.800" fontWeight="bold" fontSize="xl">Total Units</Text>
        <Text>{data?.listingOverview.totalUnits}</Text>
      </Box>
      <Box
        p={4}
        shadow="md"
        border="1px solid"
        borderRadius="md"
        textAlign="center"
        w="full"
      >
        <Text color="green.800" fontWeight="bold" fontSize="xl">Occupied</Text>
        <Text>{data?.listingOverview.occupiedUnits}</Text>
      </Box> 
      <Box
        p={4}
        shadow="md"
        border="1px solid"
        borderRadius="md"
        w="full"
        textAlign="center"
      >
        <Text color="green.800" fontWeight="bold" fontSize="xl">Vacant</Text>
        <Text>{data?.listingOverview.vacantUnits}</Text>
      </Box>
    </Flex>
  )
}

export default ListingsView;
