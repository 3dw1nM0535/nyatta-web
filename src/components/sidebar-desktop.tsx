import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

import { useListings } from 'hooks'
import { chakraStylesConfig } from 'styles'

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarDesktop = ({ ...rest }: SidebarProps) => {
  const { listings, setDefaultListing } = useListings()
  const selectListings = listings.map((item: any) => ({ label: item.name, value: item.id }))

  return (
    <Box
      w={{base: "full", md: 60}}
      borderRight="1px"
      borderRightColor="gray.200"
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex my={4} mx={8} justifyContent="space-between" alignItems="center">
        <Box w="100%">
          <Select
            chakraStyles={chakraStylesConfig}
            isSearchable={false}
            options={selectListings}
            onChange={(item: any) => setDefaultListing(item.value)}
            defaultValue={selectListings[0]}
          />
        </Box>
        {/* <CloseButton display={{base: "flex", md: "none"}} onClick={onClose} /> */}
      </Flex>
    </Box>
  )
}

export default SidebarDesktop;
