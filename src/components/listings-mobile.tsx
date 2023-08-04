import { useMemo } from 'react'

import { BoxProps, CloseButton, Drawer, DrawerContent, Flex, HStack, Icon, IconButton, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsHouseAdd } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { MdOutlineExplore } from 'react-icons/md'

import { useListings } from 'hooks'
import { chakraStylesConfig } from 'styles'

const linkItems = [
  { label: "Overview", href: "/listings", icon: FaHome },
  { label: "Units", href: "/listings/units", icon: MdOutlineExplore },
  { label: "Add", href: "/listings/setup", icon: BsHouseAdd },
]

const MobileNav = ({ ...rest }: BoxProps) => {
  const pathname = usePathname()
  const { defaultListing, listings, setDefaultListing } = useListings()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const selectListings = useMemo(() => listings.map((item: any) => ({ label: item.name, value: item.id })), [listings])
  const handleSelectListing = (item: any) => {
    setDefaultListing(item)
    onClose()
  }

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
            <Flex grow={1} direction="column" my={4}>
              <HStack mb={10}>
                <Select
                  chakraStyles={chakraStylesConfig}
                  isSearchable={false}
                  options={selectListings}
                  selectedOptionStyle="check"
                  onChange={handleSelectListing}
                  value={defaultListing}
                />
                <Spacer />
                <CloseButton display={{base: "flex", md: "none"}} onClick={onClose} />
              </HStack>
              <Flex gap={4} direction="column">
                {linkItems.map((item, index) => (
                  <Link onClick={onClose} href={item.href} key={index}>
                    <Flex
                      align="center"
                      p={4}
                      borderRadius="lg"
                      bg={pathname === item.href ? "green.700" : "white"}
                      color={pathname === item.href ? "white" : "black"}
                      _hover={{
                        bg: "green.700",
                        color: "white",
                      }}
                      cursor="pointer"
                    >
                      {item.icon && (
                        <Icon
                          as={item.icon}
                          fontSize={16}
                        />
                      )}
                      <Text fontWeight="bold">{item.label}</Text>
                    </Flex>
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
