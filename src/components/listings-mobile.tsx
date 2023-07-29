import { useMemo } from 'react'

import { BoxProps, CloseButton, Drawer, DrawerContent, Flex, HStack, IconButton, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'

import { useListings } from 'hooks'
import { chakraStylesConfig } from 'styles'

const linkItems = [
  { label: "Overview", href: "/listings" },
  { label: "Units", href: "/listings/units" },
]

const MobileNav = ({ ...rest }: BoxProps) => {
  const { defaultListing, listings, setDefaultListing } = useListings()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const selectListings = useMemo(() => listings.map((item: any) => ({ label: item.name, value: item.id })), [listings])

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        autoFocus={false}
        placement="right"
        returnFocusOnClose={false}
      >
        <DrawerContent>
          <Flex mx={4} p={4} alignItems="center">
            <Flex w="full" direction="column" my={4} mx={4}>
              <HStack mb={10}>
                <Select
                  chakraStyles={chakraStylesConfig}
                  isSearchable={false}
                  options={selectListings}
                  onChange={(item: any) => setDefaultListing(item)}
                  value={defaultListing}
                />
                <Spacer />
                <CloseButton display={{base: "flex", md: "none"}} onClick={onClose} />
              </HStack>
              <Flex gap={4} direction="column">
                {linkItems.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <Text fontWeight="bold">{item.label}</Text>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export default MobileNav
