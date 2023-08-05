"use client"

import { useMemo, useEffect } from 'react'

import { Box, BoxProps, Flex, Icon, Text } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsBuildingFillAdd } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import { MdOutlineExplore } from 'react-icons/md'

import { useListings } from 'hooks'
import { chakraStylesConfig } from 'styles'

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const linkItems = [
  { label: "Overview", href: "/listings", icon: FaHome },
  { label: "Units", href: "/listings/units", icon: MdOutlineExplore },
  { label: "Add", href: "/listings/setup", icon: BsBuildingFillAdd },
]

const SidebarDesktop = ({ ...rest }: SidebarProps) => {
  const pathname = usePathname()
  const { listings, defaultListing, setDefaultListing } = useListings()
  const selectListings = useMemo(() => listings.map((item: any) => ({ label: item.name, value: item.id })), [listings])

  useEffect(() => {
    setDefaultListing(selectListings[0])
  }, [selectListings, setDefaultListing])

  return (
    <Flex
      w={{base: "full", md: 60}}
      borderRight="1px"
      borderRightColor="gray.200"
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex direction="column" my={4} mx={4}>
        <Box w="100%" mb={10}>
          <Select
            chakraStyles={chakraStylesConfig}
            isSearchable={false}
            options={selectListings}
            onChange={(item: any) => setDefaultListing(item)}
            value={defaultListing}
            selectedOptionStyle="check"
          />
        </Box>
        <Flex gap={4} direction="column">
          {linkItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <Flex
                align="center"
                borderRadius="lg"
                bg={pathname === item.href ? "green.700" : "white"}
                color={pathname === item.href ? "white" : "black"}
                p={4}
                _hover={{
                  bg: "green.700",
                  color: "white",
                }}
                cursor="pointer"
              >
                {item.icon && (
                  <Icon
                    mr={4}
                    fontSize={16}
                    as={item.icon}
                  />
                )}
                <Text fontWeight="bold">{item.label}</Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SidebarDesktop;
