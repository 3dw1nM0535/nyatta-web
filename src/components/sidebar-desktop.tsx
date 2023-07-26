import { Box, BoxProps, Flex, Text } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import Link from 'next/link'

import { useListings } from 'hooks'
import { chakraStylesConfig } from 'styles'

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const linkItems = [
  { label: "Tenants", href: "/listings/tenancy" },
  { label: "Units", href: "/listings/units" },
]

const SidebarDesktop = ({ ...rest }: SidebarProps) => {
  const { listings, setDefaultListing } = useListings()
  const selectListings = listings.map((item: any) => ({ label: item.name, value: item.id }))

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
            onChange={(item: any) => setDefaultListing(item.value)}
            defaultValue={selectListings[0]}
          />
        </Box>
        {/* <CloseButton display={{base: "flex", md: "none"}} onClick={onClose} /> */}
        <Flex gap={4} direction="column">
          {linkItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <Text fontWeight="bold">{item.label}</Text>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SidebarDesktop;
